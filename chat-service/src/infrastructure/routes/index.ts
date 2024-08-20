import { IDependencies } from "@/application/interfaces/IDependencies";
import { controller } from "@/presentation/controller";
import { Router } from "express";



export const routes = (dependencies:IDependencies) => {
  const {sendMessage,getMessages,deleteMessage,reactMessage,getReaction}=controller(dependencies)
 

  const router = Router();
  router.route('/chat/messages').post(sendMessage)
  router.route('/messages/clan/:clanId').get(getMessages)
  router.route('/messages/:messageId').delete(deleteMessage)
  router.route('/messages/react').post(reactMessage)
  router.route('/messages/:messageId/reactions').get(getReaction)





 

  return router;
};
