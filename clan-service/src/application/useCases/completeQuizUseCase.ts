
import { IDependencies } from "../interfaces/IDependencies";



export  const completeQuizUseCase=(dependencies:IDependencies)=>{
    const {repositories:{completeQuiz}}=dependencies


    return {
        execute:async(clanId:any,userId:any,score:number)=>{
            return await completeQuiz(clanId,userId,score)
        }
    }

}