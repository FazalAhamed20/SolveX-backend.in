import { Schema, model } from 'mongoose';
import { ProblemEntity } from '@/enterprise/entities';

const problemSchema = new Schema({
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
  difficulty: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  code: {
    type: String,
    required: true
  },
 language:{
  type:[Object],
  required:true
 },
  isBlocked:{
    type:Boolean,
    default:false
  },
  isPremium:{
    type:Boolean,
    default:false
  }
}, {
  timestamps: true
});

export const Problem = model<ProblemEntity>('Problem', problemSchema);
