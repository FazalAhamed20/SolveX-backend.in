import { Router } from "express";
import { controller } from "@/presentation/controller";


export const routes = () => {
  const{createClan}=controller()
 

  const router = Router();

  router.route('/create-clan').post(createClan)


 

  return router;
};
