import { IDependencies } from '@/application/interfaces/IDependencies';
import { PracticeEntity } from '@/enterprise/entities';

export const blockPracticeUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { blockPractice },
  } = dependencies;
  return {
    execute: async (data: PracticeEntity) => {
        console.log("usecase",data);
        
      return await blockPractice(data);
    },
  };
};