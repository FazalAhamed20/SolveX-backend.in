import { NextFunction, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';
import 'cross-fetch/polyfill';

dotenv.config();

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const chatBotController = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { prompt }: { prompt: string } = req.body;


    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
      const model = client.getGenerativeModel({ model: 'gemini-1.5-pro' });
      const result = await model.generateContent(prompt);
      const response = await result.response;

      res.status(HttpStatusCode.OK).json({ response: response.text() });
    } catch (error) {
      next(error);
    }
  };
};
