import { MessageEntity } from "@/enterprise/entities";





export interface IRepositories{
    sendMessage:(data:MessageEntity)=>Promise<MessageEntity |string | null>
    getMessages:(id:string)=>Promise<MessageEntity | string | null>
    deleteMessage:(messageId:string)=>Promise<MessageEntity | string | null>
    reactMessage:(data:any)=>Promise<any>
   
  
    
}