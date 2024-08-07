
import { IDependencies } from "../interfaces/IDependencies";



export  const fetchAllClansUseCase=(dependencies:IDependencies)=>{
    const {repositories:{fetchAllClans}}=dependencies


    return {
        execute:async()=>{
            return await fetchAllClans()
        }
    }

}