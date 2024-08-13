import { MessageEntity } from "@/enterprise/entities";
import { Message } from "../models";
import {  Types } from 'mongoose';


export const getMessages = async (id: string): Promise<MessageEntity | string | null> => {
  try {
    console.log("id",id)
    const objectId = new Types.ObjectId(id);
    console.log(objectId)

    // Find messages by ObjectId
    const messages = await Message.find({ clanId: objectId });

    console.log('getMessages',messages)
    
   
    return messages as unknown as MessageEntity
  } catch (error) {
    console.error("Error sending message:", error);
    return "An error occurred while sending the message.";
  }
};