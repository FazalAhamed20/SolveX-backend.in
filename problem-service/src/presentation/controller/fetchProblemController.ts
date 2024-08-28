import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';

const languageExtensions: { [key: string]: string } = {
  javascript: 'js',
  typescript: 'ts',
  python: 'py',
  java: 'java',
  csharp: 'cs',
  go: 'go',
  ruby: 'rb',
  c:'c',
  cpp:'cpp',
  kotlin:'kt'
};

export const fetchProblemsController = () => {
  const problemDataPath = path.resolve(__dirname, '../../../../problems');

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, title } = req.params;
      const { language } = req.query;

      console.log(`Fetching problem with ID: ${id} and Title: ${title}`);
      console.log(`Language: ${language}`);

      const problemFolderPath = path.join(problemDataPath, `${id}-${title}`);
      const inputFilePath = path.join(problemFolderPath, 'input.txt');
      const outputFilePath = path.join(problemFolderPath, 'output.txt');
      const inputContent = await fs.promises.readFile(inputFilePath, 'utf-8');
      let inputJson: any[];
      try {
        inputJson = inputContent.trim().split('\n').map(line => JSON.parse(line));
      } catch (error) {
        console.error('Error parsing input JSON:', error);
        return res.status(400).json({ message: 'Invalid input format' });
      }
      const outputContent = await fs.promises.readFile(outputFilePath, 'utf-8');
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

        const languageFolderPath = path.join(problemFolderPath, language as string);
        const templateFilePath = path.join(languageFolderPath, `solution.template.${ext}`);
        const driverFilePath = path.join(languageFolderPath, `driver.${ext}`);
        const displayFilePath = path.join(languageFolderPath, `display.${ext}`);

        try {
          solutionTemplate = await fs.promises.readFile(templateFilePath, 'utf-8');
          console.log('Solution Template:', solutionTemplate);
        } catch (error) {
          console.error(`Error reading solution template for ${language}:`, error);
        }

        try {
          driverContent = await fs.promises.readFile(driverFilePath, 'utf-8');
          console.log('Driver Content:', driverContent);
        } catch (error) {
          console.error(`Error reading driver file for ${language}:`, error);
        }

        try {
          displayContent = await fs.promises.readFile(displayFilePath, 'utf-8');
          console.log('Display Content:', displayContent);
        } catch (error) {
          console.error(`Error reading display file for ${language}:`, error);
        }
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
