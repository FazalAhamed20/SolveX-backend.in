import { UserEntity } from '@/enterprise/entities';

export interface IVerifyOtpUserUseCase {
  execute(data: UserEntity): Promise<UserEntity | null>;
}
