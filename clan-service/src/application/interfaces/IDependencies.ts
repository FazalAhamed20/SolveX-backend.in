import { IUseCases } from '@/application/interfaces/IUseCases'
import {IRepositories} from '@/application/interfaces/IRepositories'



export interface  IDependencies{
    repositories:IRepositories,
    useCases:IUseCases
}