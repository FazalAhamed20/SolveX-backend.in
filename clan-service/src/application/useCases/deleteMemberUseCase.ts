
import { IDependencies } from "../interfaces/IDependencies";



export  const deleteMemberUseCase=(dependencies:IDependencies)=>{
    const {repositories:{deleteMember}}=dependencies


    return {
        execute:async(clanId:any,_id:any,memberName:any)=>{
            return await deleteMember(clanId,_id,memberName)
        }
    }

}