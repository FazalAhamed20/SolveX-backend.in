import { Router } from "express";
import { controller } from "@/presentation/controller";
import { IDependencies } from "@/application/interfaces/IDependencies";

export const routes = (dependencies: IDependencies) => {
  const { run,submit,fetchSubmission,fetchSolved,practicalRun,fetchPractical,fetchSolvedPracticals,fetchAllSubmission } = controller(dependencies);

  const router = Router();

  router.route("/run").post(run);
  router.route("/practicalrun").post(practicalRun);
  router.route("/submit").post(submit);
  router.route("/fetchSubmission").post(fetchSubmission)
  router.route("/fetchSolved").post(fetchSolved)
  router.route("/fetchpractical").post(fetchPractical)
  router.route("/fetchsolved-practicals").post(fetchSolvedPracticals)
  router.route("/submissionlist").get(fetchAllSubmission)
 

  return router;
};
