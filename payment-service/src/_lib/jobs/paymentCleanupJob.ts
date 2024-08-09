// src/jobs/paymentCleanupJob.ts

import cron from 'node-cron';
import { findPaymentsEndingToday, deletePayment } from '@/infrastructure/database/mongo/repositories/expireSubscription';

const deleteExpiredPayments = async (): Promise<void> => {
  try {
    const expiredPayments = await findPaymentsEndingToday();
    for (const payment of expiredPayments) {
      await deletePayment(payment._id);
      console.log(`Deleted expired payment for user: ${payment.userId}`);
    }
  } catch (error) {
    console.error('Error deleting expired payments:', error);
  }
};

export const setupPaymentCleanupJob = (): void => {
 
  cron.schedule('0 0 * * *', () => {
    console.log('Running cron job to delete expired payments');
    deleteExpiredPayments();
  });
};