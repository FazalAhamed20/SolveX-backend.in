import { Otp } from '../models';

import { OtpEntity } from '@/enterprise/entities';

export const userSignUp = async (
  data: OtpEntity,
): Promise<OtpEntity | null> => {
  const email = data.email;
  const existUser = await Otp.findOne({ email });
  console.log();
  if (existUser) {
    throw new Error('OTP creation failed');
  }

  const newUser = await Otp.create(data);
  console.log(newUser);

  if (!newUser) {
    throw new Error('OTP creation failed');
  }
  setTimeout(async () => {
    try {
      await Otp.findByIdAndDelete(newUser._id);
      console.log(`User with id ${newUser._id} deleted after 1 minute.`);
    } catch (error: any) {
      console.error(
        `Failed to delete user with id ${newUser._id}: ${error?.message}`,
      );
    }
  }, 60000);

  return newUser;
};
