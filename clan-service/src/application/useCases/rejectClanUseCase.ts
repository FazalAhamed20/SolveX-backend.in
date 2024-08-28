
import { IDependencies } from "../interfaces/IDependencies";



export  const rejectClanUseCase=(dependencies:IDependencies)=>{
    const {repositories:{rejectClan}}=dependencies


    return {
        execute:async(clanId:any,userId:any)=>{
            return await rejectClan(clanId,userId)
        }
    }

}