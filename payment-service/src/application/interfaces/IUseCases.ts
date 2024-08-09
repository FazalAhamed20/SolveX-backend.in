import { IBlockSubscriptionUseCase, ICheckSubscriptionUseCase, ICreatePaymentUseCase, ICreateSubscriptionUseCase, IGetAllSubscriptionUseCase } from "@/enterprise/useCaseInterface";



export interface IUseCases{
    createSubscriptionUseCase:(dependencies)=>ICreateSubscriptionUseCase
    getAllSubscriptionUseCase:(dependencies)=>IGetAllSubscriptionUseCase
    createPaymentUseCase:(dependencies)=>ICreatePaymentUseCase
    checkSubscriptionUseCase:(dependencies)=>ICheckSubscriptionUseCase
    blockSubscriptionUseCase:(dependencies)=>IBlockSubscriptionUseCase
   
   
}