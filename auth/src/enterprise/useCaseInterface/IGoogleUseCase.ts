import { UserEntity } from '../entities';

export interface IGoogleUseCase {
  execute(data: UserEntity): Promise<UserEntity | null>;
}
