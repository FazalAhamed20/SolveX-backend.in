import { IUseCases } from './IUseCases'
import {IRepositories} from '@/application/interfaces/IRepositories'



export interface  IDependencies{
    repositories:IRepositories,
    useCases:IUseCases
}