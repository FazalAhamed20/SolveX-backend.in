import { PaymentEntity, SubscriptionEntity } from "@/enterprise/entities";



export interface IRepositories{
    createSubscription:(data:SubscriptionEntity)=>Promise<SubscriptionEntity | null>
    getAllSubscription:()=>Promise<SubscriptionEntity[] | null>
    createPayment:(data:PaymentEntity)=>Promise<PaymentEntity | null>
    checkSubscription:(userId:any)=>Promise<PaymentEntity | null>
    blockSubscription:(data:SubscriptionEntity)=>Promise<SubscriptionEntity | null>

   
  
    
}