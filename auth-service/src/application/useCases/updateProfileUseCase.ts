import { UserEntity } from '@/enterprise/entities';
import { IDependencies } from '../interfaces/IDependencies';

export const updateProfileUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { updateProfile },
  } = dependencies;

  return {
    execute: async (data: UserEntity): Promise<any | undefined> => {
      const user = await updateProfile(data);

      console.log('hello')

      if (!user) {
        throw new Error('User not found with the provided email address');
      }

      return user;
    },
  };
};
