import { Schema, model } from 'mongoose';
import { PracticeEntity } from '@/enterprise/entities';

const practiceSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quickTips:{
    type:[String]
  },
  videoUrl:{
    type:String
  },
  language:{
    type:String
  },
 


  isBlocked:{
    type:Boolean,
    default:false
  }
}, {
  timestamps: true
});

export const Practice = model<PracticeEntity>('Practical', practiceSchema);