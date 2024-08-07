import { SubmissionEntity } from "@/enterprise/entities";
import { Submission } from "../models";




export const fetchSubmission = async (
    email: string,
    id:string
  ): Promise<SubmissionEntity | null> => {
  
      const submission = await Submission.findOne({ email: email,id:id },{submited:1,_id:0});
      
      if (!submission) {
        return null;
      }
  console.log('.../.../',submission)
      return submission as unknown as SubmissionEntity;
    
  };