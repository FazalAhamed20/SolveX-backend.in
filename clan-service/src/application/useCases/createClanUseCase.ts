import { ClanEntity } from "@/enterprise/entities";
import { IDependencies } from "../interfaces/IDependencies";



export  const createClanUseCase=(dependencies:IDependencies)=>{
    const {repositories:{createClan}}=dependencies


    return {
        execute:async(data:ClanEntity)=>{
            return await createClan(data)
        }
    }

}