import { IDependencies } from "../interfaces/IDependencies"




export const fetchSubmissionUseCase=(dependencies:IDependencies)=>{

    const {repositories:{fetchSubmission}}=dependencies
    return {
        execute:async(email:string,id:string)=>{
            return await fetchSubmission(email,id)
        }
    }
    
}