import { IDependencies } from "@/application/interfaces/IDependencies";
import { sendMessageController } from "./sendMessageController";
import { getMessagesController } from "./getMessagesController";



export const controller = (dependencies: IDependencies) => {
    return {
        sendMessage:sendMessageController(dependencies),
        getMessages:getMessagesController(dependencies)

        
 
    };
  };