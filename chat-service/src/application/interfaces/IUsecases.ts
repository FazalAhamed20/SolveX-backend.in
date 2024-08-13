import {
    IGetMessagesUseCase,
    ISendMessageUseCase
} from '@/enterprise/useCaseInterface'



export interface IUseCases{
    sendMessageUseCase:(dependencies)=>ISendMessageUseCase
    getMessagesUseCase:(dependencies)=>IGetMessagesUseCase
   
   
}