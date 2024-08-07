import { OtpEntity } from '@/enterprise/entities';

export interface IResendOtpUserUseCase {
  execute(data: OtpEntity): Promise<OtpEntity | null>;
}
