import { IRepositories } from '@/application/interfaces/IRepositories';
import { IUseCases } from '@/application/interfaces/IUseCases';

export interface IDependencies {
  repositories: IRepositories;
  useCases: IUseCases;
}
