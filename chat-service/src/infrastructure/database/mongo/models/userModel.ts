import { Schema, model } from 'mongoose';



const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  profileImage: {type : String},
  isBlocked:{type : Boolean,default:false},
  createdAt: { type: Date, default: Date.now },
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now }
});

export const User = model('users', userSchema);
