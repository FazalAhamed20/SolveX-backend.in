import { Subscription } from '../models';
import { SubscriptionEntity } from '@/enterprise/entities';

export const getAllSubscription = async (): Promise<SubscriptionEntity[]> => {
    const subscriptions = await Subscription.find();
    console.log('Retrieved subscriptions:', subscriptions);
    return subscriptions as unknown as SubscriptionEntity[];
  };