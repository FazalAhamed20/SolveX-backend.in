import { Schema, model } from 'mongoose';


const problemSchema = new Schema({
  id: {
    type: String,
    
  },
  title: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  difficulty: {
    type: String,
    
  },
 
 language:{
  type:[Object],
  
 },
  isBlocked:{
    type:Boolean,
    default:false
  }
}, {
  timestamps: true
});

export const Problem = model('Problem', problemSchema);
