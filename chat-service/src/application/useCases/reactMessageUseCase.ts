import { MessageEntity } from "@/enterprise/entities";
import { IDependencies } from "../interfaces/IDependencies";



export  const reactMessageUseCase=(dependencies:IDependencies)=>{

    const{repositories:{reactMessage}}=dependencies

    return {
        execute:async(data:MessageEntity)=>{
            return await reactMessage(data)
        }
    }
    
}