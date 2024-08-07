import { PracticeSubmissionEntity } from "@/enterprise/entities";
import { PracticalSubmission } from "../models";




export const fetchPractical = async (
    email: string,
    id:string
  ): Promise<PracticeSubmissionEntity | null> => {
  
      const submission = await PracticalSubmission.findOne({ email: email,id:id },{isCompleted:1,_id:0});
      
      if (!submission) {
        return null;
      }
  console.log('.../.../',submission)
      return submission as PracticeSubmissionEntity;
    
  };