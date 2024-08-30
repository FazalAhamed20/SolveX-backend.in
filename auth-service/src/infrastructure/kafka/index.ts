import { Kafka, Producer, Consumer, Partitioners } from 'kafkajs';
import dotenv from 'dotenv';
dotenv.config();

export const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [String(process.env.KAFKA_BROKER_URLS)],
  ssl: true,
  sasl: {
    username: String(process.env.KAFKA_USERNAME),
    password: String(process.env.KAFKA_PASSWORD),
    mechanism: 'plain'
  },
  connectionTimeout: 30000, 
  authenticationTimeout: 30000
});
console.log(`Kafka client initialized with clientId: ${process.env.KAFKA_CLIENT_ID}`);
console.log(`Broker URLs: ${process.env.KAFKA_BROKER_URLS}`);

export const producer: Producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
export const consumer: Consumer = kafka.consumer({
  groupId: 'auth-kafka-group',
});
