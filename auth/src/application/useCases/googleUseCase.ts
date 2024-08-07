import { IDependencies } from '@/application/interfaces/IDependencies';
import { UserEntity } from '@/enterprise/entities';

export const googleUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { googleAuth },
  } = dependencies;
  return {
    execute: async (data: UserEntity) => {
      return await googleAuth(data);
    },
  };
};
