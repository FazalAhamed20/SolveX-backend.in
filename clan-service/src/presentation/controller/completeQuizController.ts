import { IDependencies } from '@/application/interfaces/IDependencies';

import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../common/utils/httpStatusCodes';


export const completeQuizController = (dependencies:IDependencies) => {
  const {
    useCases: { completeQuizUseCase  },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
       
        

        const {userId,clanId,score}=req.body.data
        

      const result=await completeQuizUseCase(dependencies).execute(clanId,userId,score)

      console.log("result........|........",result)
      if (typeof result === 'string') {
        
        res.status(HttpStatusCode.BAD_REQUEST).send(result);
      } else if (result && 'members' in result) {
       
       
        res.status(HttpStatusCode.OK).send({success:true,result:result});
      } else {
        
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send('Unexpected result format');
      }

    
    
    } catch (error) {
      next(error);
    }
  };
};