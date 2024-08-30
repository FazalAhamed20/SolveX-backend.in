import {  Router } from "express";
import { controller } from "@/presentation/controller";
import { IDependencies } from "@/application/interfaces/IDependencies";


export const routes = (dependencies:IDependencies) => {
  const{createClan,fetchAllClans,fetchAllMember,fetchAllUsers,addMember,deleteMember,blockClan,leaveClan,requestClan,acceptClan,completeQuiz,rejectClan}=controller(dependencies)
 

  const router = Router();

  router.route('/create-clan').post(createClan)
  router.route('/fetch-all-clans').get(fetchAllClans)
  router.route('/fetchmember').post(fetchAllMember)
  router.route('/fetch-all-users').get(fetchAllUsers)
  router.route('/add-member').post(addMember)
  router.route('/clans/:clanId/members/:_id/:memberName').delete(deleteMember)
  router.route('/blockclan/:id').post(blockClan)
  router.route('/clans/leaveclan').delete(leaveClan)
  router.route('/request-clan').post(requestClan)
  router.route('/accept-clan').post(acceptClan)
  router.route('/reject-clan').post(rejectClan)
  router.route('/complete-quiz').post(completeQuiz)




 

  return router;
};
