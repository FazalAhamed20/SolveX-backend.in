import axios from 'axios';
import { Result,FinalResponse } from '../types';


const HACKEREARTH_CLIENT_SECRET = 'caa0d2418bb1c6adb9447386ec3612679ad6e89a';


export async function pollSubmissionStatus(statusUrl: string): Promise<Result> {
    const maxAttempts = 10;
    const delayMs = 1000; 

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            const response = await axios.get<FinalResponse>(statusUrl, {
                headers: {
                    'client-secret': HACKEREARTH_CLIENT_SECRET,
                },
            });

            const { result } = response.data;

            if (result.run_status.status !== 'NA' && result.compile_status !== 'Compiling...') {
                return result;
            }

            await new Promise(resolve => setTimeout(resolve, delayMs));
        } catch (error) {
            console.error('Error polling submission status:', error);
            throw error;
        }
    }

    throw new Error(`Compilation/execution timed out after ${maxAttempts} attempts`);
}