import { Schema, model } from 'mongoose';


const practicalSchema = new Schema({
  id: {
    type: String,
    
  },
  title: {
    type: String,
    
  },
 
 
 
 language:{
  type:String,
  
 },
  isBlocked:{
    type:Boolean,
    default:false
  }
}, {
  timestamps: true
});

export const Practical = model('Practical', practicalSchema);
