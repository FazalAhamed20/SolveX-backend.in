import {
  ISignupUserUseCase,
  IFindByEmailUseCase,
  ILoginUserUseCase,
  IVerifyOtpUserUseCase,
  IGoogleUseCase,
  IGetUsersUseCase,
  IBlockUserUseCase,
  IUpdateProfileUseCase,
  IRefreshUseCase,
  IRefreshTokenUseCase,
} from '@/enterprise/useCaseInterface';

export interface IUseCases {
  signupUserUseCase: (dependencies: any) => ISignupUserUseCase;
  findByEmailUseCase: (dependencies: any) => IFindByEmailUseCase;
  loginUseCase: (dependencies: any) => ILoginUserUseCase;
  verifyOtpUseCase: (dependencies: any) => IVerifyOtpUserUseCase;
  googleUseCase: (dependencies: any) => IGoogleUseCase;
  getUsersUseCase: (dependencies: any) => IGetUsersUseCase;
  blockUserUseCase: (dependencies: any) => IBlockUserUseCase;
  updateProfileUseCase: (dependencies: any) => IUpdateProfileUseCase;
  refreshUseCase: (dependencies: any) => IRefreshUseCase;
  refreshTokenUseCase: (dependencies: any) => IRefreshTokenUseCase;
}
