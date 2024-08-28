import { Schema, model } from 'mongoose';



const userSchema = new Schema(
  {
    _id:{
      type:String,
      required:true
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isBlocked:{
      type:Boolean
    },
    points: { type: Number, default: 0 },
    
  

    profileImage: {
      type: String,
    },
   
  
  },
  {
    timestamps: true,
  },
);

export const User = model('users', userSchema);
