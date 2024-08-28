import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "@/_lib/httpStatusCode/httpStatusCode";

export const fetchSolvedController = (dependencies: IDependencies) => {
  const { useCases: { fetchSolvedUseCase } } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);

      const response = await fetchSolvedUseCase(dependencies).execute(req.body.email);

      console.log(".....", response);
      res.status(HttpStatusCode.OK).send(response);
    } catch (error) {
      
      next(error);
    }
  };
};
