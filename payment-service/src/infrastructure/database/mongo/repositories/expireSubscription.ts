

import { Payment } from '@/infrastructure/database/mongo/models';


export const findPaymentsEndingToday = async (): Promise<any[]> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);  

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return await Payment.find({
    endDate: {
      $gte: today,
      $lt: tomorrow
    }
  });
};

export const deletePayment = async (paymentId: string): Promise<void> => {
  await Payment.findByIdAndDelete(paymentId);
};