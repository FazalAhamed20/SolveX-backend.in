import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { IDependencies } from '@/application/interfaces/IDependencies';
import { pollSubmissionStatus } from '@/_lib/utils/pollSubmission/pollSubmission';
import { TestCase } from '@/_lib/utils/types';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';
import dotenv from 'dotenv';
dotenv.config();

const HACKEREARTH_CLIENT_SECRET = 'caa0d2418bb1c6adb9447386ec3612679ad6e89a'

const langMap: { [key: string]: string } = {
    javascript: 'JAVASCRIPT_NODE',
    python: 'PYTHON3',
    java: 'JAVA14',
    cpp: 'CPP14',
    typescript: 'TYPESCRIPT',
    c: 'C',
    go: 'GO',
    kotlin:'KOTLIN'
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
    const { useCases: { submitUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                source,
                lang,
                functionName,
                testCases,
                display,
                id,
                code,
                title,
                language,
                difficulty,
                email,
                submited,
                _id
            }: {
                source: string;
                lang: string;
                functionName: string;
                testCases: TestCase[];
                display: string;
                id: string;
                code: string;
                title: string;
                language: string[];
                difficulty: string;
                email: string;
                submited: string;
                _id: string;
            } = req.body;

            console.log('Source Code:', source);
            console.log('Function Name:', functionName);
            console.log("Language:", lang);
            console.log('Test Cases:', testCases);
            console.log('Display:', display);

            if (!source || !lang || !functionName || !Array.isArray(testCases) || testCases.length === 0) {
                return res.status(400).json({ error: 'Source code, language, function name, and test cases are required' });
            }

            const hackerEarthLang = langMap[lang.toLowerCase()] || lang.toUpperCase();
            console.log('Mapped Language:', hackerEarthLang);

            const results = await Promise.all(testCases.map(async (testCase: TestCase, index: number) => {
                console.log("Test Case:", testCase);

                const formattedInputs = testCase.map((arg: any) => {
                    if (Array.isArray(arg)) {
                        switch (lang) {
                            case 'cpp':
                            case 'c':
                                return `{${arg.join(', ')}}`;
                            case 'go':
                                return `[]int{${arg.join(', ')}}`;
                            case 'java':
                                return `new int[]{${arg.join(', ')}}`;
                                case 'kotlin':
                                    return `intArrayOf(${arg.join(', ')})`;
                            default:
                                return `[${arg.join(', ')}]`;
                        }
                    }
                    return JSON.stringify(arg);
                }).join(', ');

                console.log("Formatted Inputs:", formattedInputs);

                let codeWithInput;
                switch (lang) {
                    case 'cpp':
                    case 'c':
                        codeWithInput = `
#include <iostream>
#include <vector>
using namespace std;

${source}

int main() {
    auto result = ${functionName}(${formattedInputs});
    cout << result << endl;
    return 0;
}`;
                        break;
                    case 'go':
                        codeWithInput = `
package main

import (
    "fmt"
)

${source}

func main() {
    result := ${functionName}(${formattedInputs})
    fmt.Println(result)
}`;
                        break;
                    case 'java':
                        codeWithInput = `
public class Solution {
    ${source}
    public static void main(String[] args) {
        
        System.out.println(${functionName}(${formattedInputs}));
    }
}`;
                        break;
                        case 'kotlin':
        codeWithInput = `
${source}

fun main() {
    println(${functionName}(${formattedInputs}))
}`;
        break;
                    default:
                        codeWithInput = `${source}
${display}(${functionName}(
    ${formattedInputs}
))`;
                }

                console.log("Code with Input:", codeWithInput);

                try {
                    const response = await axios.post(`https://api.hackerearth.com/v4/partner/code-evaluation/submissions/`, {
                        source: codeWithInput,
                        lang: hackerEarthLang,
                        input: '',
                        memory_limit: 243232,
                        time_limit: 5,
                        context: `{"id": "${Date.now()}"}`
                    }, {
                        headers: {
                            'client-secret': HACKEREARTH_CLIENT_SECRET,
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log('Response Data:', response.data);

                    const { status_update_url } = response.data;
                    const finalResult = await pollSubmissionStatus(status_update_url);

                    console.log("Final Result Run Status:", finalResult.run_status);

                    const output = await fetchOutput(finalResult.run_status.output);

                    console.log("Output:", output);
                    console.log(`Test Case ${index + 1} Output:`, output);

                    return {
                        testCaseIndex: index + 1,
                        status: finalResult.run_status.status,
                        timeUsed: finalResult.run_status.time_used,
                        memoryUsed: finalResult.run_status.memory_used,
                        output,
                        error: finalResult.run_status.stderr,
                        expectedOutput: testCase.expectedOutput
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
                        expectedOutput: testCase.expectedOutput
                    };
                }
            }));

            const data = {
                id: id,
                code: code,
                title: title,
                language: language,
                difficulty: difficulty,
                userId: _id,
                email: email,
                submited: submited
            };
            await submitUseCase(dependencies).execute(data);

            console.log('Final Response:', results);

            res.status(HttpStatusCode.OK).json({ results });
        } catch (error: any) {
            next(error);
        }
    }
}
