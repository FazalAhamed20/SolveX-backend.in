import { Router } from "express";
import { controller } from "@/presentation/controller";
import { IDependencies } from "@/application/interfaces/IDependencies";


export const routes = (dependencies:IDependencies) => {
  const{createSubscription,getAllSubscription,createPayment,checkSubscription,blockSubscription}=controller(dependencies)
 

  const router = Router();

  router.route('/createsubscription').post(createSubscription)
  router.route('/subscription').get(getAllSubscription)
  router.route('/create-payment-intent').post(createPayment)
  router.route('/checkSubscription').post(checkSubscription)
  router.route('/blocksubscription').post(blockSubscription)


 

  return router;
};
