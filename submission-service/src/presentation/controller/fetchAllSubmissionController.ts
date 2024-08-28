import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { SubmissionEntity } from '@/enterprise/entities/SubmissionEntity';


interface ProcessedSubmission {
    email: string;
    username: string;
    difficulty: string;
    language: string[];
    count: number;
    points: number;
}

export const fetchAllSubmissionController = (dependencies: IDependencies) => {
    const { useCases: { fetchAllSubmissionUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Fetching submissions...");

            const result: SubmissionEntity[] | null = await fetchAllSubmissionUseCase(dependencies).execute();

            if (!result || result.length === 0) {
                return res.status(200).json([]);
            }

            console.log('Results:', result);

           
            const processedResult: ProcessedSubmission[] = result.map(submission => ({
                email: submission.email,
                username: submission.username || 'Unknown',
                difficulty: submission.difficulty,
                language: Array.isArray(submission.language) ? submission.language : [submission.language],
                count: 1, 
                points: submission.points || 0
            }));

            const sortedResult = processedResult.sort((a, b) => b.points - a.points);

            console.log("sorted",sortedResult)

            res.json(sortedResult);
        } catch (error) {
            next(error);
        }
    };
};