import { SubmissionEntity } from "@/enterprise/entities";
import { Submission } from "../models";

export const fetchSolved = async (email: string): Promise<SubmissionEntity[] | null> => {
  
    const submissions: SubmissionEntity[] = await Submission.find(
      { email: email },
      {  _id: 0, code: 1 ,title:1,difficulty:1,createdAt:1,submited:1}
    ).lean(); 

    if (!submissions.length) {
      return null;
    }

    console.log('Submissions:', submissions);
    return submissions;
 
};
