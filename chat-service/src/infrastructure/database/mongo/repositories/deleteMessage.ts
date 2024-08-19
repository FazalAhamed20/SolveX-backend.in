import { MessageEntity } from "@/enterprise/entities";
import { Message } from '@/infrastructure/database/mongo/models';

export const deleteMessage = async (messageId:any): Promise<MessageEntity | string | null> => {
    
       
       return await Message.deleteOne({_id:messageId}) as unknown as MessageEntity

   
};