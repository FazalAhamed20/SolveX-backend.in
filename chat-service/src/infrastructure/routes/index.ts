import { IDependencies } from "@/application/interfaces/IDependencies";
import { controller } from "@/presentation/controller";
import { Router } from "express";



export const routes = (dependencies:IDependencies) => {
  const {sendMessage,getMessages}=controller(dependencies)
 

  const router = Router();
  router.route('/chat/messages').post(sendMessage)
  router.route('/messages/clan/:clanId').get(getMessages)





 

  return router;
};
