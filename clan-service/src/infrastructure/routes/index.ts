import { Router } from "express";
import { controller } from "@/presentation/controller";
import { IDependencies } from "@/application/interfaces/IDependencies";


export const routes = (dependencies:IDependencies) => {
  const{createClan,fetchAllClans,fetchAllMember,fetchAllUsers,addMember,deleteMember,blockClan}=controller(dependencies)
 

  const router = Router();

  router.route('/create-clan').post(createClan)
  router.route('/fetch-all-clans').get(fetchAllClans)
  router.route('/fetchmember').post(fetchAllMember)
  router.route('/fetch-all-users').get(fetchAllUsers)
  router.route('/add-member').post(addMember)
  router.route('/clans/:clanId/members/:_id/:memberName').delete(deleteMember)
  router.route('/blockclan/:id').post(blockClan)



 

  return router;
};
