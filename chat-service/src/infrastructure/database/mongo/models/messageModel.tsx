
import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
    content: { type: String, required: true },
    sender: { type:Schema.Types.ObjectId, ref: 'User', required: true },
    clan: { type:Schema.Types.ObjectId, ref: 'Clan', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
  });
  export const Message = model('messages', MessageSchema);