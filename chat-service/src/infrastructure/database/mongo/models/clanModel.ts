
import { Schema, model } from 'mongoose';
const clanSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: {type : String},
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    members: [{
      id: { type: Schema.Types.ObjectId, ref: 'User' },
      name:{type:String},
      role: { type: String, enum: ['member', 'leader', 'co-leader'], default: 'member' },
      joinedAt: { type: Date, default: Date.now }
    }],
    trophies:{type : String},
    isBlocked:{type:Boolean, default:false}
  });

  export const Clan = model('clans', clanSchema);