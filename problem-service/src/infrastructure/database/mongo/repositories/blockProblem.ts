import { Problem } from '../models';
import { ProblemEntity } from '@/enterprise/entities';

export const blockProblem = async (
  data: Pick<ProblemEntity, '_id' | 'isBlocked' | 'isPremium'>,
): Promise<ProblemEntity | null> => {
  console.log('repo', data);

  const updateField: Partial<Pick<ProblemEntity, 'isBlocked' | 'isPremium'>> = {};

  if ('isBlocked' in data) {
    updateField.isBlocked = data.isBlocked;
  }
  if ('isPremium' in data) {
    updateField.isPremium = data.isPremium;
  }

  if (Object.keys(updateField).length === 0) {
    console.log('No valid field to update');
    return null;
  }

  const result = await Problem.updateOne(
    { _id: data._id },
    { $set: updateField },
  );

  if (result.modifiedCount > 0) {
    const updatedProblem = await Problem.findOne({ _id: data._id });
    console.log('Updated problem', updatedProblem);
    return updatedProblem;
  } else {
    console.log('No problem found or no changes made');
    return null;
  }
};