
import { IDependencies } from "../interfaces/IDependencies";



export  const checkSubscriptionUseCase=(dependencies:IDependencies)=>{
    const {repositories:{checkSubscription}}=dependencies


    return {
        execute:async(userId:any)=>{
            return await checkSubscription(userId)
        }
    }

}