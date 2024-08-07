import { Request, Response, NextFunction } from "express";
import { IDependencies } from '@/application/interfaces/IDependencies';
import { HttpStatusCode } from "../../../../common/utils/httpStatusCodes";


export const practicalListController = (dependencies: IDependencies) => {
  const { useCases: {fetchAllPracticeUseCase } } = dependencies;
  
  
  

  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      

      const fetch=await fetchAllPracticeUseCase(dependencies).execute()

      console.log("fetch",fetch);
      
      
      
     
      res.status(HttpStatusCode.OK).json(fetch);
    } catch (error) {
     
      
      next(error);
    }
  };
};