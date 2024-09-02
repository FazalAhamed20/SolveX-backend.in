// services/submissionService.ts
import { Submission } from "../models";
import { SubmissionEntity } from "@/enterprise/entities";
import {User} from '../models';

interface ResultItem {
  email: string;
  username: string;
  difficulty: string;
  language: string[];
  count: number;
  points: number;
}

export const fetchAllSubmission = async (): Promise<SubmissionEntity[]> => {
  const submissions = await Submission.find({ submited: "Solved" }).populate('userId');
  

  const results: Record<string, ResultItem> = await submissions.reduce(async (accPromise, submission) => {
    const acc = await accPromise;
    const { userId, difficulty, language } = submission;
    
    if (!userId) {
      
      return acc;
    }

    const user = await User.findById(userId);
    
    if (!user) {
      
      return acc;
    }

    
    const email = user.email;
    const username = user.username || 'Unknown';
    const points = user.points || 0;

    const key = `${email}-${difficulty}-${language}`;

    if (!acc[key]) {
      acc[key] = {
        email,
        username,
        difficulty,
        language,
        count: 0,
        points: points,
      };
    }

    acc[key].count += 1;

    return acc;
  }, Promise.resolve({} as Record<string, ResultItem>));

  

  const sortedResults = Object.values(results).sort((a, b) => b.points - a.points);

  return sortedResults as unknown as SubmissionEntity[];
};