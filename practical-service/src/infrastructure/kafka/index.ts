import { Kafka, Producer, Consumer, Partitioners } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const brokerUrls = process.env.KAFKA_BROKER_URLS ? process.env.KAFKA_BROKER_URLS.split(',') : [];
const kafkaClientId = process.env.KAFKA_CLIENT_ID || 'default-client-id';
const kafkaUsername = process.env.KAFKA_USERNAME;
const kafkaPassword = process.env.KAFKA_PASSWORD;

if (!kafkaUsername || !kafkaPassword) {
  throw new Error('Kafka username or password is not defined in environment variables.');
}

export const kafka = new Kafka({
  clientId: kafkaClientId,
  brokers: brokerUrls,
  ssl: true,
  sasl: {
    mechanism: 'plain', 
    username: kafkaUsername,
    password: kafkaPassword,
  },
  connectionTimeout: 30000,
  authenticationTimeout: 30000,
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});

console.log(`Kafka client initialized with clientId: ${kafkaClientId}`);
console.log(`Broker URLs: ${brokerUrls.join(', ')}`);

export const producer: Producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});

export const consumer: Consumer = kafka.consumer({
  groupId: 'practical-kafka-group',
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});