import { UserEntity } from '../entities';

export interface IGetUsersUseCase {
  execute(): Promise<UserEntity[] | null>;
}
