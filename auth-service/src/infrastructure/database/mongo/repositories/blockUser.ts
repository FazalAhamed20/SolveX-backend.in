import { User } from '../models';
import { UserEntity } from '@/enterprise/entities';

export const blockUser = async (
  data: UserEntity,
): Promise<UserEntity | null> => {
  console.log('repo', data);

  const result = await User.updateOne(
    { email: data.email },
    { $set: { isBlocked: data.isBlocked } },
  );

  if (result.modifiedCount > 0) {
    const updatedUser = await User.findOne({ email: data.email }).select(
      '-password'
    );
    console.log('Updated user', updatedUser);
    return updatedUser;
  } else {
    console.log('No user found or no changes made');
    return null;
  }
};
