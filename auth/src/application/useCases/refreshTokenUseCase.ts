import { IDependencies } from '@/application/interfaces/IDependencies';

export const refreshTokenUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { refreshToken },
  } = dependencies;
  return {
    execute: async (email: string) => {
      const result = await refreshToken(email);
      console.log(result);

      if (!result) {
        throw new Error('refresh token not supported');
      }

      return result;
    },
  };
};
