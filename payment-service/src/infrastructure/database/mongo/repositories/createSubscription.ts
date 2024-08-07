import { SubscriptionEntity } from "@/enterprise/entities";
import { Subscription } from '@/infrastructure/database/mongo/models';


export const createSubscription = async (data: SubscriptionEntity): Promise<SubscriptionEntity | null> => {
  const existingSubscription = await Subscription.findOne({
    title: data.title,
    
  });

  if (existingSubscription) {
    throw new Error(`Subscription with title "${data.title}" already exists`);
  }


  const newSubscription = new Subscription(data);
  const savedSubscription = await newSubscription.save();
  console.log('saved subs',savedSubscription)

  return savedSubscription.toObject() as SubscriptionEntity;
};