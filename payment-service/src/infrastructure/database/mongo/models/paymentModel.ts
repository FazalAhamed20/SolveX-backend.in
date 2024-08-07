import { Schema, model } from 'mongoose';



const paymentSchema = new Schema(
  {
  
    id: {
      type: String,
      ref:'subscriptions',
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethodId: {
      type: String,
      required:true
    },
    startDate: {
      type: Date,
    },
    endDate:{
      type:Date
    },
    interval:{
        type:String

    },
    userId:{
        type:String,
        ref:'users',
        require:true

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

export const Payment = model('payments', paymentSchema);
