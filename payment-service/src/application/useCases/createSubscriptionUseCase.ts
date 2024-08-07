import { SubscriptionEntity } from "@/enterprise/entities";
import { IDependencies } from "../interfaces/IDependencies";



export  const createSubscriptionUseCase=(dependencies:IDependencies)=>{
    const {repositories:{createSubscription}}=dependencies


    return {
        execute:async(data:SubscriptionEntity)=>{
            return await createSubscription(data)
        }
    }

}