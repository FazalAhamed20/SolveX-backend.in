import { Request, Response, NextFunction } from "express";
import { IDependencies } from '@/application/interfaces/IDependencies';
import { problemProducer } from "@/infrastructure/kafka/producer/problemProducer";
import fs from 'fs';
import path from 'path';
import { HttpStatusCode } from "@/_lib/httpStatusCode/httpStatusCode";

export const getAllProblemsController = (dependencies: IDependencies) => {
  const { useCases: { getAllProblemsUseCase,fetchAllProblemUseCase } } = dependencies;
  const problemDataPath = path.resolve(__dirname, '../../../../problems/.problemData.json');
  console.log(problemDataPath);
  

  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const fileContent = await fs.promises.readFile(problemDataPath, 'utf-8');
       
        const problems = JSON.parse(fileContent);
        console.log("problems",problems);
      
       await getAllProblemsUseCase(dependencies).execute(problems);

      const fetch=await fetchAllProblemUseCase(dependencies).execute()

      console.log("fetch",fetch);
      
      
      
     await problemProducer(fetch)
      res.status(HttpStatusCode.OK).json(fetch);
    } catch (error) {
     
     
      next(error);
    }
  };
};
