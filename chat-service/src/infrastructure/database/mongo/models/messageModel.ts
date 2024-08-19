
import { Schema, model } from 'mongoose';

const ReactionSchema = new Schema({
  memberId: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  emoji: {
    type: String,
    required: true 
  }
});


const MessageSchema = new Schema({
    text: { type: String },
    image:{type:String},
    voice:{type:String},
    sender: {
      _id:{ type:Schema.Types.ObjectId, ref: 'User', required: true },
      name:{type:String}
    },

    clanId: { type:Schema.Types.ObjectId, ref: 'Clan', required: true },
    createdAt: { type: Date, default: Date.now },
    reactions: [ReactionSchema] 
    
  });
  export const Message = model('messages', MessageSchema);