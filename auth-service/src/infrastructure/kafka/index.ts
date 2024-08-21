import { Kafka, Producer, Consumer, Partitioners } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: ['localhost:29092'],
});
export const producer: Producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
export const consumer: Consumer = kafka.consumer({
  groupId: 'auth-kafka-group',
});
