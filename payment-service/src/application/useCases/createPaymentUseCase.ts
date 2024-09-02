import { IDependencies } from '@/application/interfaces/IDependencies';

export const createPaymentUseCase = (dependencies: IDependencies) => {
    const {repositories:{createPayment}}=dependencies

  return {
    execute: async (amount: number, interval: string, subscriptionId: string, paymentMethodId: string,userId:any) => {
      const startDate = new Date();
      let endDate: Date;
      

      switch (interval) {
        case 'monthly':
          endDate = new Date(startDate);
          endDate.setMonth(startDate.getMonth() + 1);
          break;
        case 'yearly':
          endDate = new Date(startDate);
          endDate.setFullYear(startDate.getFullYear() + 1);
          break;
       
        default:
          throw new Error('Invalid interval');
      }

      const subscription = {
        id: subscriptionId,
        amount,
        paymentMethodId,
        startDate,
        endDate,
        userId
      };

     


      return  await createPayment(subscription);
    }
  };
};
