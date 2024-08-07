import {  Types } from 'mongoose';

export interface UserEntity {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  profileImage?: string;
  isBlocked?:boolean
  
}
