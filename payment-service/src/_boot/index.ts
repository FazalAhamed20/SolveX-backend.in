import server from '@/_boot/server'
import app from '@/presentation/application'
import { runConsumer,stopConsumer } from '@/infrastructure/kafka/consumer'
import database from './database'
import { setupPaymentCleanupJob } from '@/_lib/jobs/paymentCleanupJob';


export const main = async () => {
  try {
    
    await server(app)
    await database()
    await setupPaymentCleanupJob()
    await runConsumer()
    .catch((error: any) => {
        
        process.exit()
    })

    process.on('SIGTERM', async () => {
        console.info("SIGTERM received");
        
        stopConsumer();
        });

    
  } catch (error: any) {
    
  }
}