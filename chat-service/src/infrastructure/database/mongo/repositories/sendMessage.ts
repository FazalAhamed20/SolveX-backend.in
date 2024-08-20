import { MessageEntity } from "@/enterprise/entities";
import { Message } from "../models";


export const sendMessage = async (data: MessageEntity): Promise<MessageEntity | string | null> => {

    const createdMessage = await Message.create(data);
    
   
    return createdMessage.toObject() as MessageEntity; 
 
};
