import { PaymentEntity } from "@/enterprise/entities";
import { Payment } from '@/infrastructure/database/mongo/models';

export const checkSubscription = async (userId: any): Promise<PaymentEntity | null> => {
  
    const existingSubscription = await Payment.findOne( {userId} );
    
    if (!existingSubscription) {
      return null;
    }

    return existingSubscription.toObject() as PaymentEntity;
  
};
