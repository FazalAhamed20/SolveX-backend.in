import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';

interface SubmissionEntity {
    email: string;
    username?: string; 
    difficulty: string;
    language: string[];
   
}

interface UserStats {
    totalProblems: number;
    totalPoints: number;
    languages: Set<string>;
    username?: string; 
}

export const fetchAllSubmissionController = (dependencies: IDependencies) => {
    const { useCases: { fetchAllSubmissionUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Fetching submissions...");

            const result: SubmissionEntity[] | null = await fetchAllSubmissionUseCase(dependencies).execute();

            if (!result) {
                return res.status(200).json([]);
            }

            console.log('Results:', result);

            const difficultyPoints: Record<string, number> = {
                Easy: 30,
                Medium: 50,
                Hard: 100,
            };

            const userStats: Record<string, UserStats> = {};

            result.forEach(({ email, username, difficulty, language }) => {
                if (!userStats[email]) {
                    userStats[email] = {
                        totalProblems: 0,
                        totalPoints: 0,
                        languages: new Set(),
                        username, 
                    };
                }

                userStats[email].totalProblems += 1;
                userStats[email].totalPoints += difficultyPoints[difficulty] || 0;
                userStats[email].languages.add(language[0]);
            });

            const response = Object.entries(userStats).map(([email, stats]) => ({
                email,
                username: stats.username, 
                totalProblems: stats.totalProblems,
                totalPoints: stats.totalPoints,
                languages: Array.from(stats.languages),
            }));

            

            res.json(response);
        } catch (error) {
            next(error);
        }
    };
};
