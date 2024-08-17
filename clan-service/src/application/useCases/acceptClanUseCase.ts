
import { IDependencies } from "../interfaces/IDependencies";



export  const acceptClanUseCase=(dependencies:IDependencies)=>{
    const {repositories:{acceptClan}}=dependencies


    return {
        execute:async(clanId:any,userId:any)=>{
            return await acceptClan(clanId,userId)
        }
    }

}