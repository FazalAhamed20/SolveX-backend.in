import { IDependencies } from '@/application/interfaces/IDependencies';
import { OtpEntity } from '@/enterprise/entities';

export const signupUserUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { userSignUp },
  } = dependencies;
  return {
    execute: async (data: OtpEntity) => {
      return await userSignUp(data);
    },
  };
};
