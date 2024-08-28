
import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode';
import { submissionProducer } from '@/infrastructure/kafka/producer/submissionProducer';

export const submitController=(dependencies: IDependencies)=>{
    const { useCases: {submitUseCase} } = dependencies;


    return async(req:Request,res:Response,next:NextFunction)=> {

        console.log("req.body",req.body);
        try {
            const result =await submitUseCase(dependencies).execute(req.body)
            if (result === null) {
                res.send({ success: false })
            } else {
                res.status(HttpStatusCode.OK).send({ success: true, data: result,submited:result.submited })
            }
            await submissionProducer(result)
            
            res.status(HttpStatusCode.OK).json({success:true,data:{ result }});
        } catch (error:any) {
            next()
            
        }
    }
}