import { IDependencies } from '@/application/interfaces/IDependencies';

export const getUsersUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getUser },
  } = dependencies;

  return {
    execute: async () => {
      const userList = await getUser();
      console.log('🚀 ~ execute:async ~ userList:', userList);

      return userList;
    },
  };
};
