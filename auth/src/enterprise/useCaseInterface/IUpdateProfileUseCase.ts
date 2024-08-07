import { UserEntity } from '../entities';

export interface IUpdateProfileUseCase {
  execute(data: UserEntity): Promise<UserEntity | null>;
}
