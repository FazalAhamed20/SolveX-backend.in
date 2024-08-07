import { ObjectId } from 'mongoose';

export interface UserEntity {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  terms?: boolean;
  otp?: string;
  profileImage?: string;
  role?: string;
  bio?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isAdmin?: boolean;
  isBlocked?: boolean;
  refreshToken?: string;
  accessToken?: string;
}
