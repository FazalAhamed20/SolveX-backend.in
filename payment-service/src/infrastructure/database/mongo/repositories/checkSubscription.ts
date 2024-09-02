import { PaymentEntity } from "@/enterprise/entities";
import { Payment, Subscription } from '@/infrastructure/database/mongo/models';
import mongoose from 'mongoose';

export const checkSubscription = async (userId: any): Promise<PaymentEntity | null> => {
  const existingPayment = await Payment.findOne({ userId });

  if (!existingPayment) {
    return null;
  }

  

  const subscriptionId = new mongoose.Types.ObjectId(existingPayment.id);
  const subscription = await Subscription.findById(subscriptionId);

  if (!subscription) {
    return null;
  }

  let subscriptionAmount: number | null = null;
  let subscriptionInterval: string | null = null;

  if (existingPayment.amount === subscription.monthlyPrice) {
    subscriptionAmount = subscription.monthlyPrice;
    subscriptionInterval = 'monthly';
  } else if (existingPayment.amount === subscription.yearlyPrice) {
    subscriptionAmount = subscription.yearlyPrice;
    subscriptionInterval = 'yearly';
  } else {
    return null;
  }

  return {
    ...existingPayment.toObject(),
    subscriptionTile: subscription.title || null,
    subscriptionTier: subscription.tier || null,
    subscriptionAmount: subscriptionAmount || null,
    subscriptionInterval: subscriptionInterval,
  };
};
