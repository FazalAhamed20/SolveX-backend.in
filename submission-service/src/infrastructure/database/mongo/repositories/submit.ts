import { Submission } from "../models";
import { SubmissionEntity } from "@/enterprise/entities";

export const submit = async (
  data: SubmissionEntity
): Promise<SubmissionEntity | null> => {
 
    console.log("data", data);
    const language = Array.isArray(data.language) ? data.language : [data.language];

    if (!data.email || !data.code) {
      throw new Error("Email and code must be provided");
    }

    const existingSubmission = await Submission.findOne({
      email: data.email,
      code: data.code,
      id: data.id
    });

    if (existingSubmission) {
      const newLanguages = language.filter(lang => !existingSubmission.language.includes(lang));

      if (newLanguages.length > 0) {
        existingSubmission.language.push(...newLanguages);
      }

      // Check if the existing submission status is solved
      if (existingSubmission.submited !== "Solved") {
        if (data.submited) {
          existingSubmission.submited = data.submited;
          existingSubmission.code = data.code; 
        } else {
          existingSubmission.submited = data.submited;
        }
      }

      await existingSubmission.save();
      return existingSubmission.toObject() as SubmissionEntity;
    } else {
      const submissionData = { ...data, language };
      const newSubmission = await Submission.create(submissionData);
      return newSubmission as unknown as SubmissionEntity;
    }
  
};
