import { UserEntity } from '@/enterprise/entities';
import { IDependencies } from '../interfaces/IDependencies';

export const verifyOtpUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { verifyOtp },
  } = dependencies;

  return {
    execute: async (data: UserEntity): Promise<any | undefined> => {
      const user = await verifyOtp(data);

      if (!user) {
        throw new Error('User not found with the provided email address');
      }

      return user;
    },
  };
};
