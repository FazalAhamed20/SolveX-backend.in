import { IDependencies } from "../interfaces/IDependencies"




export const fetchPracticalUseCase=(dependencies:IDependencies)=>{

    const {repositories:{fetchPractical}}=dependencies
    return {
        execute:async(email:string,id:string)=>{
            return await fetchPractical(email,id)
        }
    }
    
}