import { consumer } from "./index";
import { createSubscriber } from "./subscriber";
import CircuitBreaker from 'opossum';
import { sendAcknowledgement } from "./producer/sendAcknowledgement";

const circuitBreakerOptions = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000
};

const subscriberCircuitBreaker = new CircuitBreaker(async (subscriberMethod: string, subscriberData: any, subscriber: any) => {
    await subscriber[subscriberMethod](subscriberData);
}, circuitBreakerOptions);

subscriberCircuitBreaker.on('open', () => console.log('Circuit Breaker Opened'));
subscriberCircuitBreaker.on('close', () => console.log('Circuit Breaker Closed'));
subscriberCircuitBreaker.on('halfOpen', () => console.log('Circuit Breaker Half-Open'));

export const runConsumer = async () => {
    try {
        await consumer.connect();
        console.log("Kafka connected");

        await consumer.subscribe({
            topics: ['to-clan-service'],
            fromBeginning: true
        });

        const subscriber: any = createSubscriber();

        console.log('Subscriber:', subscriber);

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { key, value, offset } = message;
                console.log(`Received message from topic: ${topic}, partition: ${partition}, offset: ${offset}`);
                console.log(`Key: ${String(key)}`);

                try {
                    const subscriberMethod = String(key);
                    const subscriberData = JSON.parse(String(value));
                    
                    console.log(`Method: ${subscriberMethod}`);
                    console.log(`Data: ${JSON.stringify(subscriberData)}`);

                    if (subscriberMethod in subscriber) {
                        await subscriberCircuitBreaker.fire(subscriberMethod, subscriberData, subscriber);
                        
                        await sendAcknowledgement(topic, String(key), String(value));

                        await consumer.commitOffsets([
                            { topic, partition, offset: (BigInt(offset) + BigInt(1)).toString() }
                        ]);

                        console.log(`Committed offset ${offset} for topic ${topic}, partition ${partition}`);
                    } else {
                        console.error(`Subscriber method ${subscriberMethod} not found`);
                    }
                } catch (error: any) {
                    console.error('Error processing message:', error.message);
                }
            },
        });

    } catch (error: any) {
        console.error('Consumer error:', error.message);
    }
};

export const stopConsumer = async () => {
    try {
        await consumer.stop();
        await consumer.disconnect();
        console.log("Consumer stopped and disconnected");
    } catch (error: any) {
        console.error('Error stopping consumer:', error.message);
    }
};