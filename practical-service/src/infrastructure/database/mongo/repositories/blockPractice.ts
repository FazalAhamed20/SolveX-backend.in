import { Practice } from '../models';
import { PracticeEntity } from '@/enterprise/entities';

export const blockPractice = async (
  data: PracticeEntity,
): Promise<PracticeEntity | null> => {
  

  const result = await Practice.updateOne(
    { _id: data._id },
    { $set: { isBlocked: data.isBlocked } },
  );

  if (result.modifiedCount > 0) {
    const updatedProblem = await Practice.findOne({ _id: data._id })
    
    return updatedProblem;
  } else {
    
    return null;
  }
};