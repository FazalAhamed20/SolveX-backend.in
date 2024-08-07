import { UserEntity } from '@/enterprise/entities';

export interface IFindByEmailUseCase {
  execute(email: string): Promise<UserEntity | null>;
}
