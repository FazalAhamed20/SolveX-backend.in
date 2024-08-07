import { IDependencies } from '@/application/interfaces/IDependencies';
import { ProblemEntity } from '@/enterprise/entities';

export const blockProblemUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { blockProblem },
  } = dependencies;
  return {
    execute: async (data: ProblemEntity) => {
        console.log("usecase",data);
        
      return await blockProblem(data);
    },
  };
};