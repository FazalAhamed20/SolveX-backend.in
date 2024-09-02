import { MessageEntity } from "@/enterprise/entities";
import { Message } from "../models";
import {  Types } from 'mongoose';


export const getReaction = async (messageId: string): Promise<MessageEntity | string | null> => {

    
    const objectId = new Types.ObjectId(messageId);
    
    const messages = await Message.findById({ _id: objectId });

    
    
   
    return messages as unknown as MessageEntity
 
};
