import { ProblemEntity } from '@/enterprise/entities';
import { IDependencies } from '@/application/interfaces/IDependencies';

export const getAllProblemsUseCase = (dependencies: IDependencies) => {
  const{repositories:{problemData}}=dependencies
 

  


  return {
    execute: async (data:ProblemEntity[]) => {
      
      
      console.log("data",data);
      
        
        return await problemData(data)
      
    }
  };
};
