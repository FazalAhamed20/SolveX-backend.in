import { Schema, model, Types } from 'mongoose';

const clanMemberSchema = new Schema({
  id: { type: Types.ObjectId, ref: 'User' },
  name: String,
  role: String,
  avatar: { type: String, required: false }
}, { _id: false });

const requestMemberSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  status:{type:String,default:'Pending'},
  username:{type:String}
}, { _id: false });

const clanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: [clanMemberSchema],
    userId: {
      type: Types.ObjectId,
      ref: 'users',
      required: true
    },
    trophies: {
      type: String,
      default: '0'
    },
    isBlocked:{
      type:Boolean,
      default:false
    },
    request:[requestMemberSchema]
  },
  {
    timestamps: true,
  }
);

export const Clan = model('clans', clanSchema);