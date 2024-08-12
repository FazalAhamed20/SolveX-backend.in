import { ObjectId } from 'mongoose';

export interface OtpEntity {
  _id?: ObjectId;

  email: string;
  otp: number;
  createdAt?: Date;
  updatedAt?: Date;
}
