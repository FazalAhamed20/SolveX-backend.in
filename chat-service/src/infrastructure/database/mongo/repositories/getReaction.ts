import { MessageEntity } from "@/enterprise/entities";
import { Message } from "../models";
import {  Types } from 'mongoose';


export const getReaction = async (messageId: string): Promise<MessageEntity | string | null> => {

    console.log("id",messageId)
    const objectId = new Types.ObjectId(messageId);
    console.log(objectId)
    const messages = await Message.findById({ _id: objectId });

    console.log('getMessages',messages)
    
   
    return messages as unknown as MessageEntity
 
};
