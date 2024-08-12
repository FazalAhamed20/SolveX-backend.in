import { generateRefreshToken } from '@/_lib/utils/jwt';
import { Otp, User } from '../models';
import { UserEntity } from '@/enterprise/entities';

export const verifyOtp = async (
  data: UserEntity,
): Promise<UserEntity | null> => {
  const otpRecord = await Otp.findOne({ otp: data.otp });

  if (!otpRecord) {
    throw new Error('OTP not found or invalid');
  }

  delete data.otp;

  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    await User.updateOne({ email: data.email }, { password: data.password });
    return existingUser;
  } else {
    data.refreshToken = generateRefreshToken({
      _id: String(data?._id),
      email: data?.email,
    });
    const newUser = await User.create(data);
    return newUser;
  }
};
