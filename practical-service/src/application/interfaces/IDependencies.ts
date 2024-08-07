import { IUseCases } from '@/application/interfaces/IUseCases'
import { IRepositories } from './IRepositories'

export interface IDependencies {
 repositories:IRepositories
  useCases: IUseCases
}