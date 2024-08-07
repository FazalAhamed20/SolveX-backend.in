import { IDependencies } from "../interfaces/IDependencies"




export const fetchSolvedUseCase=(dependencies:IDependencies)=>{

    const {repositories:{fetchSolved}}=dependencies
    return {
        execute:async(email:string)=>{
            return await fetchSolved(email)
        }
    }
    
}