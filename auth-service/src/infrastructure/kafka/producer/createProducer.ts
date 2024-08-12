import { producer, consumer } from "..";
import CircuitBreaker from 'opossum';

const circuitBreakerOptions = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000,
};

const producerCircuitBreaker = new CircuitBreaker(async (message: any) => {
    await producer.connect();
    try {
        return await producer.send(message);
    } finally {
        await producer.disconnect();
    }
}, circuitBreakerOptions);

producerCircuitBreaker.on('open', () => console.log('Circuit Breaker is now OPEN'));
producerCircuitBreaker.on('close', () => console.log('Circuit Breaker is now CLOSED'));
producerCircuitBreaker.on('halfOpen', () => console.log('Circuit Breaker is now HALF-OPEN'));

export const sendMessageToService = async (
    serviceTopic: string,
    eventType: string,
    data: any | null
) => {
    const message = {
        topic: serviceTopic,
        messages: [{
            key: eventType,
            value: JSON.stringify(data)
        }]
    };

    try {
        const result = await producerCircuitBreaker.fire(message);
        console.log(`Message sent successfully to ${serviceTopic}`);
        return result;
    } catch (error: any) {
        if (error.type === 'open') {
            console.error(`Circuit is open. Not attempting to send message to ${serviceTopic}.`);
        } else {
            console.error(`Kafka produce error for ${serviceTopic}:`, error?.message);
        }
        throw error;
    }
}

export const userCreatedProducer = async (data: any | null) => {
  
    try {
        const [submissionResult, problemResult, clanResult] = await Promise.all([
            sendMessageToService('to-submission-service', 'userCreated', data),
            sendMessageToService('to-problem-service', 'userCreated', data),
            sendMessageToService('to-clan-service', 'userCreated', data),
            sendMessageToService('to-chat-service', 'userCreated', data)
        ]);
        return { submissionResult, problemResult, clanResult };
    } catch (error:any) {
        console.error('Error sending userCreated message to services:', error.message);
        throw error;
    }
}

export const listenForAcknowledgements = async () => {
    await consumer.connect();
    await consumer.subscribe({ 
        topics: ['to-submission-service-ack', 'to-problem-service-ack', 'to-clan-service-ack','to-chat-service-ack'], 
        fromBeginning: false 
    });

    await consumer.run({
        eachMessage: async ({ topic,  message }) => {
            if (!message.key || !message.value) {
                console.error('Received acknowledgement with null key or value');
                return;
            }
            
            const value = JSON.parse(message.value.toString());

            console.log(`Received acknowledgement from ${topic}`);
            console.log(`Original Key: ${value.originalKey}`);
            console.log(`Status: ${value.status}`);
            console.log(`Timestamp: ${value.timestamp}`);

            await handleAcknowledgement(topic, value);
        },
    });
};

async function handleAcknowledgement(topic: string, ackData: any) {
    console.log(`Handling acknowledgement for ${topic}:`, ackData);
  
}

export const stopAcknowledgementListener = async () => {
    try {
        await consumer.stop();
        await consumer.disconnect();
        console.log("Acknowledgement listener stopped and disconnected");
    } catch (error: any) {
        console.error('Error stopping acknowledgement listener:', error.message);
    }
};

async function main() {
    try {
        await listenForAcknowledgements();
    } catch (error:any) {
        console.error('Error in listenForAcknowledgements:', error.message);
    }
}

main().catch(console.error);
