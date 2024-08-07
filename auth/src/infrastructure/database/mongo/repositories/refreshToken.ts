import { User } from '../models';
import { UserEntity } from '@/enterprise/entities';
import jwt from 'jsonwebtoken';
import { generateRefreshToken } from '@/_lib/utils/jwt';

export const refreshToken = async (
  email: string,
): Promise<UserEntity | null> => {
  const user = await User.findOne({ email });
  console.log("email",email);
  

  if (!user || !user.refreshToken) {
    throw new Error('Invalid user session');
  }
  jwt.verify(user.refreshToken, String(process.env.REFRESH_TOKEN_SECRET));

  const refreshToken = generateRefreshToken({
    _id: String(user?._id),
    email: user?.email,
  });
  user.refreshToken = refreshToken;

  await user.save();

  return user;
};
