import { Message } from "../models";

export const reactMessage = async (data: any): Promise<any> => {
    const { messageId, emoji, userId } = data;

   
    const findMessage = await Message.findById(messageId);
    
    if (!findMessage) {
        throw new Error('Message not found');
    }

   
    findMessage.reactions.push({ memberId: userId, emoji });

    
    const result = await findMessage.save();

   console.log('res',result)
    return result.reactions;
};
