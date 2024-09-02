import { IDependencies } from '@/application/interfaces/IDependencies';
import { SubscriptionEntity } from '@/enterprise/entities';

export const blockSubscriptionUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { blockSubscription },
  } = dependencies;
  return {
    execute: async (data: SubscriptionEntity) => {
        
        
      return await blockSubscription(data);
    },
  };
};