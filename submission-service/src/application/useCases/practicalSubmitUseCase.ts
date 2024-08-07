import { IDependencies } from "../interfaces/IDependencies"
import { PracticeSubmissionEntity } from "@/enterprise/entities"



export const practicalSubmitUseCase=(dependencies:IDependencies)=>{

    const {repositories:{practicalSubmit}}=dependencies
    return {
        execute:async(data:PracticeSubmissionEntity)=>{
            return await practicalSubmit(data)
        }
    }
    
}