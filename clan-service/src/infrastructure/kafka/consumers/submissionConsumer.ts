import { Submission } from "@/infrastructure/database/mongo/models";

export default async (data: any) => {
  try {
    
    const newSubmission = new Submission(data);
    await newSubmission.save();
    
  } catch (error: any) {
    
  }
};