import { ClanEntity } from "@/enterprise/entities";
import { IDependencies } from "../interfaces/IDependencies";



export  const addMemberUseCase=(dependencies:IDependencies)=>{
    const {repositories:{addMember}}=dependencies


    return {
        execute:async(data:ClanEntity)=>{
            return await addMember(data)
        }
    }

}