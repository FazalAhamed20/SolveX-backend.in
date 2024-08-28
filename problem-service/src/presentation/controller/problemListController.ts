import { Request, Response, NextFunction } from "express";
import { IDependencies } from '@/application/interfaces/IDependencies';
import { HttpStatusCode } from "@/_lib/httpStatusCode/httpStatusCode";


export const problemListController = (dependencies: IDependencies) => {
  const { useCases: {fetchAllProblemUseCase } } = dependencies;
  
  
  

  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      

      const fetch=await fetchAllProblemUseCase(dependencies).execute()

      console.log("fetch",fetch);
      
      
      
     
      res.status(HttpStatusCode.OK).json(fetch);
    } catch (error) {
     
      
      next(error);
    }
  };
};
