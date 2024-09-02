import { Submission } from "../models";
import { SubmissionEntity } from "@/enterprise/entities";
import { User } from "../models"; 

export const submit = async (
  data: SubmissionEntity
): Promise<SubmissionEntity | null> => {
  
  const language = Array.isArray(data.language) ? data.language : [data.language];

  if (!data.email || !data.code) {
    throw new Error("Email and code must be provided");
  }

  const existingSubmission = await Submission.findOne({
    email: data.email,
    code: data.code,
    id: data.id
  });

  const updateUserPoints = async (email: string, difficulty: string, languageCount: number) => {
    const user = await User.findOne({ email });
    if (user) {
      const difficultyPoints = {
        Easy: 10,
        Medium: 20,
        Hard: 30
      };
      let points = difficultyPoints[difficulty as keyof typeof difficultyPoints] || 0;
      
    
  
if (languageCount > 1) {
  
  
  points += (languageCount - 1) * 20; 
}
      
      user.points = (user.points || 0) + points;
      await user.save();
    }
  };

  if (existingSubmission) {
    const newLanguages = language.filter(lang => !existingSubmission.language.includes(lang));

    if (newLanguages.length > 0) {
      existingSubmission.language.push(...newLanguages);
      await updateUserPoints(data.email, data.difficulty, newLanguages.length);
      
    }

    if (existingSubmission.submited !== "Solved") {
      if (data.submited) {
        existingSubmission.submited = data.submited;
        existingSubmission.code = data.code;

      
        if (data.submited === "Solved") {
          await updateUserPoints(data.email, data.difficulty, existingSubmission.language.length);
          
          
        }
      } else {
        existingSubmission.submited = data.submited;
      }
    }

    await existingSubmission.save();
    return existingSubmission.toObject() as SubmissionEntity;
   
  } else {
    const submissionData = { ...data, language };
    const newSubmission = await Submission.create(submissionData);

   
    if (data.submited === "Solved") {
      await updateUserPoints(data.email, data.difficulty, language.length);
      
    }

    return newSubmission as unknown as SubmissionEntity;
  }
};