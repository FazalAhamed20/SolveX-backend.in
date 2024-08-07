
import { IDependencies } from "../interfaces/IDependencies";



export  const fetchAllMembersUseCase=(dependencies:IDependencies)=>{
    const {repositories:{fetchAllMembers}}=dependencies


    return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        execute:async(id:string,name:string)=>{
            return await fetchAllMembers(id,name)
        }
    }

}