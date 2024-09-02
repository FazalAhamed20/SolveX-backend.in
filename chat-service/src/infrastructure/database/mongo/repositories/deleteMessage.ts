import { MessageEntity } from "@/enterprise/entities";
import { Message } from "@/infrastructure/database/mongo/models";
import cloudinary from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const deleteMessage = async (messageId: any): Promise<MessageEntity | string | null> => {
 
    const findMessage = await Message.findById(messageId);

    if (!findMessage) {
      return "Message not found";
    }

    if (findMessage.image) {
       const urlParts = findMessage.image.split('/');
       const uploadIndex = urlParts.lastIndexOf('upload');
       const publicId = 'upload/' + urlParts.slice(uploadIndex + 1).join('/').split('.')[0];

      try {
        await cloudinary.v2.uploader.destroy(publicId);
        
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return "Error deleting image from Cloudinary";
      }
    }

    if (findMessage.voice) {
       const urlParts = findMessage.voice.split('/');
       const uploadIndex = urlParts.lastIndexOf('upload');
       const publicId = 'upload/' + urlParts.slice(uploadIndex + 1).join('/').split('.')[0];

      try {
        await cloudinary.v2.uploader.destroy(publicId);
        
      } catch (error) {
        console.error("Error deleting voice file from Cloudinary:", error);
        return "Error deleting voice file from Cloudinary";
      }
    }

    const deleteResult = await Message.deleteOne({ _id: messageId });

    if (deleteResult.deletedCount === 0) {
      return "Message deletion failed";
    }

    return deleteResult as unknown as MessageEntity;
 
};
