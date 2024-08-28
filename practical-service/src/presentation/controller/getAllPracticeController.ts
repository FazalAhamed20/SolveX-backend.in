import { Request, Response, NextFunction } from "express";
import { IDependencies } from '@/application/interfaces/IDependencies';
import fs from 'fs';
import path from 'path';
import { HttpStatusCode } from "@/_lib/httpStatusCode/httpStatusCode";
import { practicalProducer } from "@/infrastructure/kafka/producer/practicalProducer";

export const getAllPracticeController = (dependencies: IDependencies) => {
  const { useCases: { getAllPracticeUseCase,fetchAllPracticeUseCase } } = dependencies;
  const practiceDataPath = path.resolve(__dirname, '../../../../practical/.detailsData.json');
  console.log(practiceDataPath);
  

  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const fileContent = await fs.promises.readFile(practiceDataPath, 'utf-8');
       
        const practical = JSON.parse(fileContent);
        console.log("problems",practical);
      
       await getAllPracticeUseCase(dependencies).execute(practical);

      const fetch=await fetchAllPracticeUseCase(dependencies).execute()

      console.log("fetch.....",fetch);
      await practicalProducer(fetch)
      
      
      
     
      res.status(HttpStatusCode.OK).json(fetch);
    } catch (error) {
      next(error);
    }
  };
};