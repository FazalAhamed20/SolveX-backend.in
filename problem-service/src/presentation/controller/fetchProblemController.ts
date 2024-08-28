import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';
import dotenv from 'dotenv';
dotenv.config()

const languageExtensions: { [key: string]: string } = {
  javascript: 'js',
  typescript: 'ts',
  python: 'py',
  java: 'java',
  csharp: 'cs',
  go: 'go',
  ruby: 'rb',
  c: 'c',
  cpp: 'cpp',
  kotlin: 'kt'
};

export const fetchProblemsController = () => {
  const githubToken = process.env.GITHUB_TOKEN;
  const repoOwner = 'FazalAhamed20';
  const repoName = 'problems';

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
      return '';
    }
  };

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, title } = req.params;
      const { language } = req.query;

      console.log(`Fetching problem with ID: ${id} and Title: ${title}`);
      console.log(`Language: ${language}`);

      const problemFolder = `${id}-${title}`;
      const inputContent = await fetchFileContent(`${problemFolder}/input.txt`);
      const outputContent = await fetchFileContent(`${problemFolder}/output.txt`);

      let inputJson: any[];
      try {
        inputJson = inputContent.trim().split('\n').map(line => JSON.parse(line));
      } catch (error) {
        console.error('Error parsing input JSON:', error);
        return res.status(400).json({ message: 'Invalid input format' });
      }

      let outputJson: any[];
      try {
        outputJson = outputContent.trim().split('\n').map(line => JSON.parse(line));
      } catch (error) {
        console.error('Error parsing output JSON:', error);
        return res.status(400).json({ message: 'Invalid output format' });
      }

      console.log('Output:', outputJson);

      let solutionTemplate = '';
      let driverContent = '';
      let displayContent = '';

      if (language) {
        const ext = languageExtensions[language as string];
        if (!ext) {
          console.error(`Unsupported language: ${language}`);
          return res.status(400).json({ message: 'Unsupported language' });
        }

        const languageFolder = `${problemFolder}/${language}`;
        solutionTemplate = await fetchFileContent(`${languageFolder}/solution.template.${ext}`);
        driverContent = await fetchFileContent(`${languageFolder}/driver.${ext}`);
        displayContent = await fetchFileContent(`${languageFolder}/display.${ext}`);

        console.log('Solution Template:', solutionTemplate);
        console.log('Driver Content:', driverContent);
        console.log('Display Content:', displayContent);
      }

      res.status(HttpStatusCode.OK).json({
        id,
        title,
        language,
        input: inputJson,
        output: outputJson,
        solutionTemplate,
        driver: driverContent,
        display: displayContent
      });
    } catch (error) {
      next(error);
    }
  };
};