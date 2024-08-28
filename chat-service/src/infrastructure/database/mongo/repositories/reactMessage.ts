import { Message } from "../models";

export const reactMessage = async (data: any): Promise<any> => {
    const { messageId, emoji, userId } = data;

    const findMessage = await Message.findById(messageId);
    
    if (!findMessage) {
        throw new Error('Message not found');
    }
    const existingReactionIndex = findMessage.reactions.findIndex(
        reaction => reaction.memberId.toString() === userId
    );

    if (existingReactionIndex !== -1) {
        if (emoji === null) {
            findMessage.reactions.splice(existingReactionIndex, 1);
        } else {
            findMessage.reactions[existingReactionIndex].emoji = emoji;
        }
    } else if (emoji !== null) {
        findMessage.reactions.push({ memberId: userId, emoji });
    }
    const result = await findMessage.save();

    console.log('res', result);
    return result.reactions;
};