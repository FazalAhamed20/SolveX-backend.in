import crypto from 'crypto';

export const generateRandomString = () => {
  return crypto.randomBytes(4).toString('hex').slice(0, 8);
};
