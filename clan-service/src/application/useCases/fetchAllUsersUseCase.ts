
import { IDependencies } from "../interfaces/IDependencies";



export  const fetchAllUsersUseCase=(dependencies:IDependencies)=>{
    const {repositories:{fetchAllUsers}}=dependencies


    return {
        execute:async()=>{
            return await fetchAllUsers()
        }
    }

}