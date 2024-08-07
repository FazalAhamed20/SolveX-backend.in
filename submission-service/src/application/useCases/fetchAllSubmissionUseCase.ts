import { IDependencies } from '@/application/interfaces/IDependencies';

export const fetchAllSubmissionUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { fetchAllSubmission },
  } = dependencies;

  return {
    execute: async () => {
      const SubmissionList = await fetchAllSubmission();
      console.log('🚀 ~ execute:async ~ userList:', SubmissionList);

      return SubmissionList;
    },
  };
};