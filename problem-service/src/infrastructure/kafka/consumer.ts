import { consumer } from "./index";
import { createSubscriber } from "./subscriber";
import CircuitBreaker from 'opossum';
import { sendAcknowledgement } from "./producer/sendAcknowledgement";

const circuitBreakerOptions = {
    timeout: 30000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000
};

const subscriberCircuitBreaker = new CircuitBreaker(async (subscriberMethod: string, subscriberData: any, subscriber: any) => {
    await subscriber[subscriberMethod](subscriberData);
}, circuitBreakerOptions);

subscriberCircuitBreaker.on('open', () => );
subscriberCircuitBreaker.on('close', () => );
subscriberCircuitBreaker.on('halfOpen', () => );

export const runConsumer = async () => {
    try {
        await consumer.connect();
        

        await consumer.subscribe({
            topics: ['to-problem-service'],
            fromBeginning: true
        });

        const subscriber: any = createSubscriber();

        

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { key, value, offset } = message;
                
                }`);

                try {
                    const subscriberMethod = String(key);
                    const subscriberData = JSON.parse(String(value));
                    
                    
                    }`);

                    if (subscriberMethod in subscriber) {
                        await subscriberCircuitBreaker.fire(subscriberMethod, subscriberData, subscriber);
                        
                        await sendAcknowledgement(topic, String(key), String(value));

                        await consumer.commitOffsets([
                            { topic, partition, offset: (BigInt(offset) + BigInt(1)).toString() }
                        ]);

                        
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
        
    } catch (error: any) {
        console.error('Error stopping consumer:', error.message);
    }
};
