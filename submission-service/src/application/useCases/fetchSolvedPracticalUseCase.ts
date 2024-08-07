import { IDependencies } from "../interfaces/IDependencies"




export const fetchSolvedPracticalUseCase=(dependencies:IDependencies)=>{

    const {repositories:{fetchSolvedPractical}}=dependencies
    return {
        execute:async(email:string)=>{
            return await fetchSolvedPractical(email)
        }
    }
    
}