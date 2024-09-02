import { producer, Topicconsumer as consumer } from "..";
import CircuitBreaker from 'opossum';

const circuitBreakerOptions = {
    timeout: 30000,
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

producerCircuitBreaker.on('open', () => );
producerCircuitBreaker.on('close', () => );
producerCircuitBreaker.on('halfOpen', () => );

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

export const problemProducer = async (data: any | null) => {
    return sendMessageToService('to-submission-service', 'problemCreated', data);
}


export const listenForAcknowledgements = async () => {
    await consumer.connect();
    await consumer.subscribe({ topics: ['to-submission-service-ack'], fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic,  message }) => {
            if (!message.key || !message.value) {
                console.error('Received acknowledgement with null key or value');
                return;
            }

            
            const value = JSON.parse(message.value.toString());

            
            
            
            

            await handleAcknowledgement(value);
        },
    });
};

async function handleAcknowledgement(ackData: any) {
    
    
    
}

export const stopAcknowledgementListener = async () => {
    try {
        await consumer.stop();
        await consumer.disconnect();
        
    } catch (error: any) {
        console.error('Error stopping acknowledgement listener:', error.message);
    }
};

async function main() {
  
    listenForAcknowledgements().catch(console.error);

    
}

main().catch(console.error);