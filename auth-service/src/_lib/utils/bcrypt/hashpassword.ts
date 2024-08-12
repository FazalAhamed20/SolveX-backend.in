import { genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string) => {
  try {
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    if (!hashPassword) {
      throw new Error('Password hashing error!');
    }
    return hashPassword;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
