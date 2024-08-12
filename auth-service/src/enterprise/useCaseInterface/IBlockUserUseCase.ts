import { UserEntity } from '@/enterprise/entities';

export interface IBlockUserUseCase {
  execute(data: UserEntity): Promise<UserEntity | null>;
}
