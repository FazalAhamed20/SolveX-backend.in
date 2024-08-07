import { Practice } from '../models';
import { PracticeEntity } from '@/enterprise/entities';

export const blockPractice = async (
  data: PracticeEntity,
): Promise<PracticeEntity | null> => {
  console.log('repo', data);

  const result = await Practice.updateOne(
    { _id: data._id },
    { $set: { isBlocked: data.isBlocked } },
  );

  if (result.modifiedCount > 0) {
    const updatedProblem = await Practice.findOne({ _id: data._id })
    console.log('Updated problem', updatedProblem);
    return updatedProblem;
  } else {
    console.log('No problem found or no changes made');
    return null;
  }
};