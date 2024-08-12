import { User } from '../models';
import { UserEntity } from '@/enterprise/entities';

export const updateProfile = async (
  data: UserEntity,
): Promise<UserEntity | null> => {
  const {
    email,
    role,
    username,
    bio,
    github,
    linkedin,
    twitter,
    profileImage,
  } = data;

  const user = await User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        role,
        username,
        bio,
        github,
        linkedin,
        twitter,
        profileImage,
      },
    },
    { new: true, projection: { password: 0 } },
  );

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
