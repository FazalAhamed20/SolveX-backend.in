import { IDependencies } from '@/application/interfaces/IDependencies';
import { UserEntity } from '@/enterprise/entities';

export const blockUserUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { blockUser },
  } = dependencies;
  return {
    execute: async (data: UserEntity) => {
      return await blockUser(data);
    },
  };
};
