import { PaymentEntity } from "@/enterprise/entities";
import { Payment } from '@/infrastructure/database/mongo/models';

export const createPayment = async (data: PaymentEntity): Promise<PaymentEntity | null> => {
  console.log(data)
  const existingPayment = await Payment.findOne({
    id: data.id,userId:data.userId
  });

  if (existingPayment) {
    const currentDate = new Date();
    if (existingPayment.endDate && currentDate < existingPayment.endDate) {
        const endDate = new Date(existingPayment.endDate);
        const formattedEndDate = endDate.toLocaleDateString();
        throw new Error(`Please make a payment after your current subscription expires on ${formattedEndDate}`);
    }
  }

  const newPayment = new Payment(data);
  const savedPayment = await newPayment.save();
  console.log('saved payment', savedPayment);

  return savedPayment.toObject() as PaymentEntity;
};
