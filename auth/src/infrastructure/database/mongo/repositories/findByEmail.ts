import { User } from '../models';
import { UserEntity } from '@/enterprise/entities';

export const findByEmail = async (
  email: string,
): Promise<UserEntity | null> => {
  const user = await User.findOne({ email });
  if (user) {
    if (user.isBlocked) {
      throw new Error('Your account has been blocked. Please contact support.');
    }
    return user;
  }

  return user;
};
