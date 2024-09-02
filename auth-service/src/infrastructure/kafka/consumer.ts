import { consumer } from './index';

export const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topics: ['to-submission-service-ack'],
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
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

export const stopConsumer = async () => {
  try {
    await consumer.stop();
    await consumer.disconnect();
    
  } catch (error: any) {
    console.error('Error stopping acknowledgement listener:', error.message);
  }
};

async function main() {
  runConsumer().catch(console.error);
}

main().catch(console.error);
