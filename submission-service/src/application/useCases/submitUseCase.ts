import { IDependencies } from "../interfaces/IDependencies"
import { SubmissionEntity } from "@/enterprise/entities"



export const submitUseCase=(dependencies:IDependencies)=>{

    const {repositories:{submit}}=dependencies
    return {
        execute:async(data:SubmissionEntity)=>{
            return await submit(data)
        }
    }
    
}