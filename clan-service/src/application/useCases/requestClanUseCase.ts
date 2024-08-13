
import { IDependencies } from "../interfaces/IDependencies";



export  const requestClanUseCase=(dependencies:IDependencies)=>{
    const {repositories:{requestClan}}=dependencies


    return {
        execute:async(clanId:any,userId:any)=>{
            return await requestClan(clanId,userId)
        }
    }

}