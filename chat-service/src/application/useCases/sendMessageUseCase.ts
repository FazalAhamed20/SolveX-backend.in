import { MessageEntity } from "@/enterprise/entities";
import { IDependencies } from "../interfaces/IDependencies";



export  const sendMessageUseCase=(dependencies:IDependencies)=>{

    const{repositories:{sendMessage}}=dependencies

    return {
        execute:async(data:MessageEntity)=>{
            return await sendMessage(data)
        }
    }
    
}