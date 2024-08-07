import { User } from '../models';
import { UserEntity } from '@/enterprise/entities';

export const findByEmail = async (
  email: string,
): Promise<UserEntity | null> => {
  const user = await User.findOne({ email });
  if (user) {
    if (user.isBlocked) {
      throw new Error('User is blocked');
    }
    return user;
  }

  return user;
};
