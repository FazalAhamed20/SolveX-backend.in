import { IDependencies } from '@/application/interfaces/IDependencies';

export const refreshUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { refresh },
  } = dependencies;
  return {
    execute: async (email: string, refreshToken: string) => {
      const result = await refresh(email, refreshToken);
      console.log(result);

      if (!result) {
        throw new Error('refresh token not supported');
      }

      return result;
    },
  };
};
