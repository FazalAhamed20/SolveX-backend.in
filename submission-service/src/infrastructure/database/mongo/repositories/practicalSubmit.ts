import { PracticeSubmissionEntity } from '@/enterprise/entities/PracticeSubmissionEntity';
import { PracticalSubmission } from '@/infrastructure/database/mongo/models/practicalSubmissionModel';

export const practicalSubmit = async (
  data: PracticeSubmissionEntity
): Promise<PracticeSubmissionEntity | string> => {
 
    const existingSubmission = await PracticalSubmission.findOne({
      email: data.email,
      title: data.title,
      isCompleted: data.isCompleted,
    });

    if (existingSubmission) {
      return 'Already completed';
    }

    const newSubmission = new PracticalSubmission(data);
    const savedSubmission = await newSubmission.save();
    return savedSubmission as PracticeSubmissionEntity;
  
};
