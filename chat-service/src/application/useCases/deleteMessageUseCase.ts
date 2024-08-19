
import { IDependencies } from "../interfaces/IDependencies";



export  const deleteMessageUseCase=(dependencies:IDependencies)=>{
    const {repositories:{deleteMessage}}=dependencies


    return {
        execute:async(messageId:any)=>{
            return await deleteMessage(messageId)
        }
    }

}