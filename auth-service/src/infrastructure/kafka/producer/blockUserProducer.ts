import { producer, consumer } from '..';
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

producerCircuitBreaker.on('open', () =>
  ,
);
producerCircuitBreaker.on('close', () =>
  ,
);
producerCircuitBreaker.on('halfOpen', () =>
  ,
);

export const sendMessageToService = async (
  serviceTopic: string,
  eventType: string,
  data: any | null,
) => {
  const message = {
    topic: serviceTopic,
    messages: [
      {
        key: eventType,
        value: JSON.stringify(data),
      },
    ],
  };

  try {
    const result = await producerCircuitBreaker.fire(message);
    
    return result;
  } catch (error: any) {
    if (error.type === 'open') {
      console.error(
        `Circuit is open. Not attempting to send message to ${serviceTopic}.`,
      );
    } else {
      console.error(`Kafka produce error for ${serviceTopic}:`, error?.message);
    }
    throw error;
  }
};

export const blockUserProducer = async (data: any | null) => {
  // Send messages to both topics
  const submissionResult = await sendMessageToService(
    'to-submission-service',
    'userCreated',
    data,
  );
  const problemResult = await sendMessageToService(
    'to-problem-service',
    'userCreated',
    data,
  );
  return { submissionResult, problemResult };
};

export const listenForAcknowledgements = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topics: ['to-submission-service-ack', 'to-problem-service-ack'],
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.key || !message.value) {
        console.error('Received acknowledgement with null key or value');
        return;
      }

      const value = JSON.parse(message.value.toString());

      
      
      
      

      await handleAcknowledgement(topic, value);
    },
  });
};

async function handleAcknowledgement(topic: string, ackData: any) {
  
  // Add specific handling logic for each service if needed
  if (topic === 'to-submission-service-ack') {
    // Handle submission service acknowledgement
  } else if (topic === 'to-problem-service-ack') {
    // Handle problem service acknowledgement
  }
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
  try {
    await listenForAcknowledgements();
  } catch (error: any) {
    console.error('Error in listenForAcknowledgements:', error.message);
  }
}

main().catch(console.error);
