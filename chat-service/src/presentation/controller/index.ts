import { IDependencies } from "@/application/interfaces/IDependencies";
import { sendMessageController } from "./sendMessageController";
import { getMessagesController } from "./getMessagesController";
import { deleteMessageController } from "./deleteMessageController";
import { reactMessageController } from "./reactMessageController";



export const controller = (dependencies: IDependencies) => {
    return {
        sendMessage:sendMessageController(dependencies),
        getMessages:getMessagesController(dependencies),
        deleteMessage:deleteMessageController(dependencies),
        reactMessage:reactMessageController(dependencies)

        
 
    };
  };