import { IDependencies } from '@/application/interfaces/IDependencies';

export const getAllSubscriptionUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getAllSubscription },
  } = dependencies;

  return {
    execute: async () => {
      const subscriptionsList = await getAllSubscription();
      console.log('🚀 ~ execute:async ~ subscriptionsList:', subscriptionsList);

      return subscriptionsList;
    },
  };
};