import server from '@/_boot/server'
import app from '@/presentation/application'
import { runConsumer,stopConsumer } from '@/infrastructure/kafka/consumer'
import database from './database'


export const main = async () => {
  try {
    
    await server(app)
    await database()
    await runConsumer()
    .catch((error: any) => {
        console.log(error);
        process.exit()
    })

    process.on('SIGTERM', async () => {
        console.info("SIGTERM received");
        console.log("consumer stopping");
        stopConsumer();
        });

    
  } catch (error: any) {
    console.log(`Oops!`, error?.message)
  }
}