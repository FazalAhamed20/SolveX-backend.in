import { Schema, model } from 'mongoose';
import { OtpEntity } from '@/enterprise/entities';

const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },

    otp: {
      type: Number,
      required: true,
    },

    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Otp = model<OtpEntity>('otp', otpSchema);
