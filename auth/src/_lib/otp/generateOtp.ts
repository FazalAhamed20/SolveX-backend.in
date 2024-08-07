import { randomInt } from 'crypto';

export const generateOTP = async () => {
  return await randomInt(1000, 10000);
};
