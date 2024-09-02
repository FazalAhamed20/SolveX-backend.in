import { IDependencies } from '@/application/interfaces/IDependencies';
import { PracticeEntity } from '@/enterprise/entities';

export const blockPracticeUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { blockPractice },
  } = dependencies;
  return {
    execute: async (data: PracticeEntity) => {
        
        
      return await blockPractice(data);
    },
  };
};