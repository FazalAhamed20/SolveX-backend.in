/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { IDependencies } from "@/application/interfaces/IDependencies";

const execPromise = promisify(exec);

export const practicalRunController = (dependencies: IDependencies) => {
    const { useCases: { practicalSubmitUseCase } } = dependencies;
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(".....", req.body);
            
            const { code, input, output,id,language,title,email } = req.body;
            console.log("code", code);
            console.log("input", input);
            console.log("output", output);

            if (typeof code !== 'string' || code.trim() === '') {
                return res.status(400).json({ error: 'Invalid code provided' });
            }

            const preparedCode = `
                ${code}
                
                const [arr, index, value] = ${JSON.stringify(input)};
                const result = insertElement(arr, index, value);
                console.log(JSON.stringify(result));
            `;

            const fileName = 'tempScript.js';
            const filePath = path.join(__dirname, fileName);
            fs.writeFileSync(filePath, preparedCode);

            const cmd = `node ${filePath}`;
            const { stdout, stderr } = await execPromise(cmd);

            if (stderr) {
                res.status(500).json({ error: stderr });
            } else {
                const userOutput = stdout.trim();
                const expectedOutput = JSON.stringify(output);
                console.log(userOutput, expectedOutput);
                
                const isCorrect = userOutput === expectedOutput;
               
                if (isCorrect) {
                    const data={
                        id,
                        email,
                        title,
                        language,
                        isCompleted:true
                        
                    }
                  
                    const result = await practicalSubmitUseCase(dependencies).execute(data)
                    console.log("result",result)
                    
                    res.json({ 
                        output: userOutput,
                        expected: expectedOutput,
                        isCorrect: true,
                        message: "Correct! Your solution matches the expected output.",
                        submissionResult: result
                    });
                } else {
                    res.json({ 
                        output: userOutput,
                        expected: expectedOutput,
                        isCorrect: false,
                        message: "Incorrect. Your solution doesn't match the expected output."
                    });
                }
            }

            fs.unlinkSync(filePath);
        } catch (error: any) {
            next(error);
        }
    }
}