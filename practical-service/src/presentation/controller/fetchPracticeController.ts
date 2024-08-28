
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';

   export const fetchPracticeController=()=>{
    const practiceDataPath=path.resolve(__dirname,'../../../../practical')
    return async (req:Request,res:Response,next:NextFunction)=>{
   try {
    const { language } = req.query;
    
    const {id}=req.params
    console.log(practiceDataPath,id)
    let solutionTemplate = '';
    const practiceFolderPath = path.join(practiceDataPath, language as string, id);
    console.log("practiceFolderPath",practiceFolderPath);
    
    const languageTemplate=path.join(practiceFolderPath,'solution.template.js')
    console.log("anguageTemplate",languageTemplate);
    
    solutionTemplate = await fs.promises.readFile(languageTemplate, 'utf-8');
    console.log("solution",solutionTemplate);
    
    const inputFilePath = path.join(practiceFolderPath, 'input.txt');
    const outputFilePath = path.join(practiceFolderPath, 'output.txt');
    const inputContent = await fs.promises.readFile(inputFilePath, 'utf-8');
    let inputJson: any[];
    try {
      inputJson = inputContent.trim().split('\n').map(line => JSON.parse(line));
    } catch (error) {
      console.error('Error parsing input JSON:', error);
      return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid input format' });
    }
    const outputContent = await fs.promises.readFile(outputFilePath, 'utf-8');
    let outputJson: any[];
    try {
      outputJson = outputContent.trim().split('\n').map(line => JSON.parse(line));
    } catch (error) {
      console.error('Error parsing output JSON:', error);
      return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid output format' });
    }

    console.log('.....', language,
         inputJson,
         outputJson,
        solutionTemplate);
    

    res.status(HttpStatusCode.OK).json({
       
        language,
        input: inputJson,
        output: outputJson,
        solutionTemplate
      });
    
   } catch (error) {
    next(error)
    
   }
    }
   }