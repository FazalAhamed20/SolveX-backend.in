import { PracticeSubmissionEntity } from "@/enterprise/entities";
import { PracticalSubmission } from "../models";

export const fetchSolvedPractical = async (email: string): Promise<PracticeSubmissionEntity[] | null> => {
  
    const submissions: PracticeSubmissionEntity[] = await PracticalSubmission.find(
      { email: email },
      { isCompleted: 1, _id: 0, id: 1 ,title:1,language:1,createdAt:1}
    ).lean(); 

    if (!submissions.length) {
      return null;
    }

    
    return submissions;
  
 
};
