
import { IDependencies } from "../interfaces/IDependencies";



export  const getReactionUseCase=(dependencies:IDependencies)=>{

    const{repositories:{getReaction}}=dependencies

    return {
        execute:async(messageId:string)=>{
            return await getReaction(messageId)
        }
    }
    
}