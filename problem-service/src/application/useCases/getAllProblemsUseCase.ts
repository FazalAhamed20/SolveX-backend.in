import { ProblemEntity } from '@/enterprise/entities';
import { IDependencies } from '@/application/interfaces/IDependencies';

export const getAllProblemsUseCase = (dependencies: IDependencies) => {
  const{repositories:{problemData}}=dependencies
 

  


  return {
    execute: async (data:ProblemEntity[]) => {
      
      
      
      
        
        return await problemData(data)
      
    }
  };
};
