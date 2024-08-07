import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { IDependencies } from '@/application/interfaces/IDependencies';
import { pollSubmissionStatus } from '@/_lib/utils/pollSubmission/pollSubmission';
import { TestCase } from '@/_lib/utils/types';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';

const HACKEREARTH_CLIENT_SECRET = 'caa0d2418bb1c6adb9447386ec3612679ad6e89a';


const langMap: { [key: string]: string } = {
    javascript: 'JAVASCRIPT_NODE',
    python: 'PYTHON3',
    java: 'JAVA14',
    cpp: 'CPP14',
    typescript:'TYPESCRIPT',
    c:'C',
    go:'GO'
};

async function fetchOutput(url: string): Promise<string> {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching output:', error);
        throw new Error('Failed to fetch the output');
    }
}

export const runController = (dependencies: IDependencies) => {
    const { useCases: {submitUseCase} } = dependencies;

    return async (req: Request, res: Response ,next:NextFunction) => {
        try {
            const { source, lang, functionName, testCases ,display,id,code,title,language,difficulty,email,submited,_id}: { source: string; lang: string; functionName: string; testCases: TestCase[],display:string ,id:string,code:string,title:string,language:string[],difficulty:string,email:string,submited:string,_id:string} = req.body;
            console.log('Source Code:', source);
            console.log('Function Name:', functionName);
            console.log("language",lang)
            console.log('Test Cases:', testCases);
            console.log('Display:',display);

            if (!source || !lang || !functionName || !Array.isArray(testCases) || testCases.length === 0) {
                return res.status(400).json({ error: 'Source code, language, function name, and test cases are required' });
            }
            // const problemDataPath = path.resolve(__dirname, '../../../../problems/.problemData.json');
            const hackerEarthLang = langMap[lang.toLowerCase()] || lang.toUpperCase();
            console.log('././............',hackerEarthLang);
            

            const results = await Promise.all(testCases.map(async (testCase: TestCase, index: number) => {
                
            console.log("test",testCase)
             const formattedInputs = testCase.map((arg: any[]) => 
                    Array.isArray(arg) ? `[${arg.join(',')}]` : JSON.stringify(arg)
                ).join(', ');

                console.log("formateed",formattedInputs)
                
               
                             const codeWithInput = `${source}
${display}(${functionName}(
    ${formattedInputs}
))`;
                
                  
                    console.log("Code with input:", codeWithInput);
                  

                try {
                    const response = await axios.post(`https://api.hackerearth.com/v4/partner/code-evaluation/submissions/`, {
                        source: codeWithInput,
                        lang: hackerEarthLang,
                        input: '', 
                        memory_limit: 243232,
                        time_limit: 5,
                        context: `{"id": "${Date.now()}"}`,
                    }, {
                        headers: {
                            'client-secret': HACKEREARTH_CLIENT_SECRET,
                            'Content-Type': 'application/json',
                        }
                    });
                    console.log('.//.//..',HACKEREARTH_CLIENT_SECRET);
                 
                   
                   

                    const { status_update_url } = response.data;
                    console.log(response.data);

                    
                    const finalResult = await pollSubmissionStatus(status_update_url);


                    console.log("/././",finalResult.run_status)

                    const output = await fetchOutput(finalResult.run_status.output);

                    console.log(",./,.//",finalResult.run_status)
                    
                    console.log(`Test Case ${index + 1} Output:`, output);

                    return {
                        testCaseIndex: index + 1,
                        status: finalResult.run_status.status,
                        timeUsed: finalResult.run_status.time_used,
                        memoryUsed: finalResult.run_status.memory_used,
                        output,
                        error: finalResult.run_status.stderr ,
                        expectedOutput: testCase.expectedOutput,
                    };
                } catch (error: any) {
                    console.error('Error processing test case:', error);
                    return {
                        testCaseIndex: index + 1,
                        status: 'Error',
                        timeUsed: '',
                        memoryUsed: '',
                        output: '',
                        error: error instanceof Error ? error.message : 'Unknown error occurred',
        expectedOutput: testCase.expectedOutput,
                    };
                }
        }));
        const data={
            id:id,
            code:code,
            title:title,
            language:language,
            difficulty:difficulty,
            userId:_id,
            email:email,
            submited:submited
        }
       await submitUseCase(dependencies).execute(data)
                   

            console.log('Final Response:', results);

            res.status(HttpStatusCode.OK).json({ results });

        } catch (error: any) {
            
        next(error)
        }
    }
}
