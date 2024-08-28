import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const fetchPracticeController = () => {
  const githubToken = process.env.GITHUB_TOKEN;
  const repoOwner = 'FazalAhamed20';
  const repoName = 'practice';

  const fetchFileContent = async (path: string): Promise<string> => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`,
        {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3.raw'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching file from GitHub: ${path}`, error);
      throw error;
    }
  };

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { language } = req.query;
      const { id } = req.params;

      console.log('Fetching practice data for:', language, id);

      const basePath = `${language}/${id}`;
      
      const solutionTemplate = await fetchFileContent(`${basePath}/solution.template.js`);
      console.log("solution", solutionTemplate);

      const inputContent = await fetchFileContent(`${basePath}/input.txt`);
      let inputJson: any[];
      try {
        inputJson = inputContent.trim().split('\n').map(line => JSON.parse(line));
      } catch (error) {
        console.error('Error parsing input JSON:', error);
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid input format' });
      }

      const outputContent = await fetchFileContent(`${basePath}/output.txt`);
   

      console.log('.....', language, inputJson, outputContent, solutionTemplate);

      res.status(HttpStatusCode.OK).json({
        language,
        input: inputJson,
        output: outputContent,
        solutionTemplate
      });
    } catch (error) {
      console.error('Error in fetchPracticeController:', error);
      next(error);
    }
  };
};