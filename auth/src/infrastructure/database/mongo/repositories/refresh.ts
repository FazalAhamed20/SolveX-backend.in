import { User } from '../models';
import { UserEntity } from '@/enterprise/entities';

export const refresh = async (
  email: string,
  refreshToken: string,
): Promise<UserEntity | null> => {
  const user = await User.findOne({ email });

  await User.updateOne(
    { email: email },
    { $set: { refreshToken: refreshToken } },
  );

  return user;
};
