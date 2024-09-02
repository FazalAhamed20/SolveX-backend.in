import { Problem } from '../models';
import { ProblemEntity } from '@/enterprise/entities';

export const blockProblem = async (
  data: Pick<ProblemEntity, '_id' | 'isBlocked' | 'isPremium'>,
): Promise<ProblemEntity | null> => {
  

  const updateField: Partial<Pick<ProblemEntity, 'isBlocked' | 'isPremium'>> = {};

  if ('isBlocked' in data) {
    updateField.isBlocked = data.isBlocked;
  }
  if ('isPremium' in data) {
    updateField.isPremium = data.isPremium;
  }

  if (Object.keys(updateField).length === 0) {
    
    return null;
  }

  const result = await Problem.updateOne(
    { _id: data._id },
    { $set: updateField },
  );

  if (result.modifiedCount > 0) {
    const updatedProblem = await Problem.findOne({ _id: data._id });
    
    return updatedProblem;
  } else {
    
    return null;
  }
};