import { Schema, model } from 'mongoose';



const subscriptionSchema = new Schema(
  {
  
    monthlyPrice: {
      type: Number,
      required: true,
    },
    yearlyPrice: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
    },
    title: {
      type: String,
    },
    tier:{
      type:String
    },
    isBlocked:{
      type:Boolean,
      default:false
    },
  
  },
  {
    timestamps: true,
  },
);

export const Subscription = model('subscriptions', subscriptionSchema);
