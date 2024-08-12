import { UserEntity } from '@/enterprise/entities';

export interface ILoginUserUseCase {
  execute(email: string, password: string): Promise<UserEntity | null>;
}
