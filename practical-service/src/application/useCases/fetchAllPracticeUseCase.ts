import { IDependencies } from '@/application/interfaces/IDependencies';

export const fetchAllPracticeUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { fetchPractice },
  } = dependencies;

  return {
    execute: async () => {
      const practiceList = await fetchPractice();
      console.log('🚀 ~ execute:async ~ userList:', practiceList);

      return practiceList;
    },
  };
};