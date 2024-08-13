import { MessageEntity } from "@/enterprise/entities";
import { Message } from "../models";


export const sendMessage = async (data: MessageEntity): Promise<MessageEntity | string | null> => {
  try {
    const createdMessage = await Message.create(data);
    
   
    return createdMessage.toObject() as MessageEntity; 
  } catch (error) {
    console.error("Error sending message:", error);
    return "An error occurred while sending the message.";
  }
};
