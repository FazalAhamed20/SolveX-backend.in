import { Schema, model } from 'mongoose';

const practicalSubmissionSchema = new Schema({
  id: {
    type: String,
    ref: 'Practical',
    required: true
    
  },
 
  title: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
 
  email: {
    type: String,
    ref: 'User',
    required: true
  },
  isCompleted:{
    type:Boolean
  },

}, {
  timestamps: true
});

export const PracticalSubmission = model('PracticalSubmission', practicalSubmissionSchema);

