import { OtpEntity } from '../entities';

export interface ISignupUserUseCase {
  execute(data: OtpEntity): Promise<OtpEntity | null>;
}
