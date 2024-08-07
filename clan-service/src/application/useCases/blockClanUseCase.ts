import { IDependencies } from '@/application/interfaces/IDependencies';


export const blockClanUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { blockClan },
  } = dependencies;
  return {
    execute: async (isBlocked:boolean,id:string) => {
        
        
      return await blockClan(isBlocked,id);
    },
  };
};