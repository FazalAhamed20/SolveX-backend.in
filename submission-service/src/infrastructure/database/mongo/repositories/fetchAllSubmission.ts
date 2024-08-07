// services/submissionService.ts
import { Submission } from "../models";
import { SubmissionEntity } from "@/enterprise/entities";
import { User } from "@/_lib/utils/types/"; // Import User interface



export const fetchAllSubmission = async (): Promise<SubmissionEntity[]> => {
  
    const submissions = await Submission.find({submited:"Solved"}).populate('userId');
    console.log("Submissions:", submissions);

    
    const results = submissions.reduce((acc, submission) => {
        const { userId, difficulty, language } = submission;
        const user = userId as unknown as User; 
        const email = user.email;
        const username = user.username || 'Unknown';

        const key = `${email}-${difficulty}-${language}`;

        if (!acc[key]) {
            acc[key] = {
                email,
                username,
                difficulty,
                language,
                count: 0,
            };
        }

        acc[key].count += 1;

        return acc;
    }, {});

    return Object.values(results);
};
