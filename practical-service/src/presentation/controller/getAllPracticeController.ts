import { Request, Response, NextFunction } from "express";
import { IDependencies } from '@/application/interfaces/IDependencies';
import { HttpStatusCode } from "@/_lib/httpStatusCode/httpStatusCode";
import { practicalProducer } from "@/infrastructure/kafka/producer/practicalProducer";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

export const getAllPracticeController = (dependencies: IDependencies) => {
  const { useCases: { getAllPracticeUseCase, fetchAllPracticeUseCase } } = dependencies;
  const githubToken = process.env.GITHUB_TOKEN;
  const repoOwner = 'FazalAhamed20';
  const repoName = 'practice';
  const detailsDataFile = '.detailsData.json';

  const fetchPracticalDataFromGithub = async (): Promise<any> => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${detailsDataFile}`,
        {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3.raw'
          }
        }
      );
      
      return response.data
    } catch (error) {
      console.error('Error fetching practical data from GitHub:', error);
      throw error;
    }
  };

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const practical = await fetchPracticalDataFromGithub();
      
      
      await getAllPracticeUseCase(dependencies).execute(practical);

      const fetch = await fetchAllPracticeUseCase(dependencies).execute();

      
      
      await practicalProducer(fetch);
      
      res.status(HttpStatusCode.OK).json(fetch);
    } catch (error) {
      next(error);
    }
  };
};