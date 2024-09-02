import { PracticeEntity } from '@/enterprise/entities';
import { IDependencies } from '@/application/interfaces/IDependencies';

export const getAllPracticeUseCase = (dependencies: IDependencies) => {
  const{repositories:{practiceData}}=dependencies
 

  


  return {
    execute: async (data:PracticeEntity[]) => {
     
      
      
      
        
        return await practiceData(data)
     
    }
  };
};
