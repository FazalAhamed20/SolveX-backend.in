import { controller } from "@/presentation/controller";
import { Router } from "express";



export const routes = () => {
  const {sendMessage}=controller()
 

  const router = Router();
  router.route('/send-message').post(sendMessage)





 

  return router;
};
