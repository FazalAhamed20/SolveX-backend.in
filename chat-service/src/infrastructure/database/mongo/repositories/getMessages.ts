import { MessageEntity } from "@/enterprise/entities";
import { Message } from "../models";
import {  Types } from 'mongoose';


export const getMessages = async (id: string): Promise<MessageEntity | string | null> => {
  
    
    const objectId = new Types.ObjectId(id);
    

  
    const messages = await Message.find({ clanId: objectId });

    
    
   
    return messages as unknown as MessageEntity
 
};
