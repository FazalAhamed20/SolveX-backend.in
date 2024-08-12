import { UserEntity } from '@/enterprise/entities';
import { OtpEntity } from '@/enterprise/entities';

export interface IRepositories {
  userSignUp: (data: OtpEntity) => Promise<OtpEntity | null>;
  findByEmail: (email: string) => Promise<UserEntity | null>;
  verifyOtp: (data: UserEntity) => Promise<UserEntity | null>;
  googleAuth: (data: UserEntity) => Promise<UserEntity | null>;
  getUser: () => Promise<UserEntity[] | null>;
  blockUser: (data: UserEntity) => Promise<UserEntity | null>;
  updateProfile: (data: UserEntity) => Promise<UserEntity | null>;
  refresh: (email: string, refreshToken: string) => Promise<UserEntity | null>;
  refreshToken: (email: string) => Promise<UserEntity | null>;
}
