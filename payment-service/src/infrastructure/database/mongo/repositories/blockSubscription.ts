import { Subscription } from '../models';
import { SubscriptionEntity } from '@/enterprise/entities';

export const blockSubscription = async (
  data: SubscriptionEntity,
): Promise<SubscriptionEntity | null> => {
  console.log('repo', data);


  const result = await Subscription.updateOne(
    { _id: data._id },
    { $set: { isBlocked: data.isBlocked } },
  );

  if (result.modifiedCount > 0) {
    
    const updatedSubscriptionDoc = await Subscription.findById(data._id);

    if (updatedSubscriptionDoc) {
      const updatedSubscription = updatedSubscriptionDoc.toObject() as SubscriptionEntity;
      console.log('Updated Subscription', updatedSubscription);
      return updatedSubscription;
    }
  }

  return null;
};
