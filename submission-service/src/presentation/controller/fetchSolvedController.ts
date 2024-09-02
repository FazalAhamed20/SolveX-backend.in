import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "@/_lib/httpStatusCode/httpStatusCode";

export const fetchSolvedController = (dependencies: IDependencies) => {
  const { useCases: { fetchSolvedUseCase } } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      

      const response = await fetchSolvedUseCase(dependencies).execute(req.body.email);

      
      res.status(HttpStatusCode.OK).send(response);
    } catch (error) {
      
      next(error);
    }
  };
};
