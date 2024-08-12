import { UserEntity } from '@/enterprise/entities';

export interface IRefreshUseCase {
  execute(email: string, refreshToken: string): Promise<UserEntity | null>;
}
