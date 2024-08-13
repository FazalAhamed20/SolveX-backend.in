
import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
    text: { type: String, required: true },
    sender: {
      _id:{ type:Schema.Types.ObjectId, ref: 'User', required: true },
      name:{type:String}
    },

    clanId: { type:Schema.Types.ObjectId, ref: 'Clan', required: true },
    createdAt: { type: Date, default: Date.now },
    
  });
  export const Message = model('messages', MessageSchema);