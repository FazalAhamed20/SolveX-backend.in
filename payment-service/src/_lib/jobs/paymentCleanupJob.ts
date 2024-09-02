// src/jobs/paymentCleanupJob.ts

import cron from 'node-cron';
import { findPaymentsEndingToday, deletePayment } from '@/infrastructure/database/mongo/repositories/expireSubscription';

const deleteExpiredPayments = async (): Promise<void> => {
  try {
    const expiredPayments = await findPaymentsEndingToday();
    for (const payment of expiredPayments) {
      await deletePayment(payment._id);
      
    }
  } catch (error) {
    console.error('Error deleting expired payments:', error);
  }
};

export const setupPaymentCleanupJob = (): void => {
 
  cron.schedule('0 0 * * *', () => {
    
    deleteExpiredPayments();
  });
};