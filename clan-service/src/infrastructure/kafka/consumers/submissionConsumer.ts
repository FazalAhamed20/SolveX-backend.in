import { Submission } from "@/infrastructure/database/mongo/models";

export default async (data: any) => {
  try {
    console.log(data);
    const newSubmission = new Submission(data);
    await newSubmission.save();
    console.log("Submission saved successfully");
  } catch (error: any) {
    console.log("Error saving submission:", error?.message);
  }
};