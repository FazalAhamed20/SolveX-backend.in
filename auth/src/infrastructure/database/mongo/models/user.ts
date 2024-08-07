import { Schema, model } from 'mongoose';
import { UserEntity } from '@/enterprise/entities';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },

    profileImage: {
      type: String,
    },
    role: {
      type: String,
    },
    bio: {
      type: String,
    },
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    terms: {
      type: Boolean,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<UserEntity>('users', userSchema);
