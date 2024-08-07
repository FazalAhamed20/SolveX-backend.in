import { UserEntity } from '@/enterprise/entities';

export interface IRefreshTokenUseCase {
  execute(email: string): Promise<UserEntity | null>;
}
