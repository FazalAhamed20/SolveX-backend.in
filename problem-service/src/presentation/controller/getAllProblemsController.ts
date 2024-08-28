import { Request, Response, NextFunction } from "express";
import { IDependencies } from '@/application/interfaces/IDependencies';
import { problemProducer } from "@/infrastructure/kafka/producer/problemProducer";
import { HttpStatusCode } from "@/_lib/httpStatusCode/httpStatusCode";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getAllProblemsController = (dependencies: IDependencies) => {
  const { useCases: { getAllProblemsUseCase, fetchAllProblemUseCase } } = dependencies;
  const githubToken = process.env.GITHUB_TOKEN;
  const repoOwner = 'FazalAhamed20';
  const repoName = 'problems';
  const problemDataFile = '.problemData.json';

  const fetchProblemDataFromGithub = async (): Promise<any> => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${problemDataFile}`,
        {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3.raw'
          }
        }
      );
      console.log('response from github',response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching problem data from GitHub:', error);
      throw error;
    }
  };

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const problems = await fetchProblemDataFromGithub();
      console.log("problems", problems);
      
      await getAllProblemsUseCase(dependencies).execute(problems);

      const fetch = await fetchAllProblemUseCase(dependencies).execute();

      console.log("fetch", fetch);
      
      await problemProducer(fetch);
      res.status(HttpStatusCode.OK).json(fetch);
    } catch (error) {
      next(error);
    }
  };
};