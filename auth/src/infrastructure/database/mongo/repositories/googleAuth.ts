import { generateRefreshToken } from '@/_lib/utils/jwt';
import { User } from '../models';
import { UserEntity } from '@/enterprise/entities';

export const googleAuth = async (
  data: UserEntity,
): Promise<UserEntity | null> => {
  const { email } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (existingUser.isBlocked) {
      throw new Error('User is blocked');
    }
    return existingUser;
  }
  data.refreshToken = generateRefreshToken({
    _id: String(data?._id),
    email: data?.email,
  });

  const result = await User.create(data);

  return result;
};


