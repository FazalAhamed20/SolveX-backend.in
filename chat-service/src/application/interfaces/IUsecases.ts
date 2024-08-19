import {
    IDeleteMessageUseCase,
    IGetMessagesUseCase,
    IReactMessageUseCase,
    ISendMessageUseCase
} from '@/enterprise/useCaseInterface'



export interface IUseCases{
    sendMessageUseCase:(dependencies)=>ISendMessageUseCase
    getMessagesUseCase:(dependencies)=>IGetMessagesUseCase
    deleteMessageUseCase:(dependencies)=>IDeleteMessageUseCase
    reactMessageUseCase:(dependencies)=>IReactMessageUseCase
   
   
}