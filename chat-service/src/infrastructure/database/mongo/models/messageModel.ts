
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
    replyTo: {
      _id: {
        type:Schema.Types.ObjectId,
        ref: 'Message'
      },
      text: String,
      image:String,
      voice:String,
      sender: {
        name: String
      }
    },
    createdAt: { type: Date, default: Date.now },
    reactions: [ReactionSchema] ,
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent'
    }
    
  });
  export const Message = model('messages', MessageSchema);


  