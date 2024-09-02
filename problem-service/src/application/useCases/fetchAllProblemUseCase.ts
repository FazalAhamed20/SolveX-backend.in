import { IDependencies } from '@/application/interfaces/IDependencies';

export const fetchAllProblemUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { fetchProblem },
  } = dependencies;

  return {
    execute: async () => {
      const problemList = await fetchProblem();
      

      return problemList;
    },
  };
};