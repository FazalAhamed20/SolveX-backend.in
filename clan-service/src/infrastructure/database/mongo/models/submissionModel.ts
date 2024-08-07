import { Schema, model } from 'mongoose';

const submissionSchema = new Schema({
  id: {
    type: String,
    required: true
    
  },
  code: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  language: {
    type: [String],
    required: true
  },
  difficulty:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true
  },
  submited:{
    type:String
  },
  isAttempt:{
    type:Boolean
  },
  userId:{
    type: Schema.Types.ObjectId, 
    ref: 'users', 
    required: true

  }
 
}, {
  timestamps: true
});

export const Submission = model('Submission', submissionSchema);