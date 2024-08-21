import { Schema, model, Types } from 'mongoose';

const clanMemberSchema = new Schema({
  id: { type: Types.ObjectId, ref: 'User' },
  name: String,
  role: String,
  avatar: { type: String, required: false },
  score: { type: Number, default: 0 },
  isToday: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  expirationTime: { type: Date, default: undefined },
}, { _id: false });

const requestMemberSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'Pending' },
  username: { type: String }
}, { _id: false });

const clanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: [clanMemberSchema],
    userId: {
      type: Types.ObjectId,
      ref: 'users',
      required: true
    },
    trophies: {
      type: String,
      default: '0'
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    request: [requestMemberSchema]
  },
  {
    timestamps: true,
  }
);

clanSchema.pre('save', function(next) {
  this.members.forEach((member) => {
    if (member.isToday) {
      const expirationTime = new Date(member.createdAt.getTime() + 24 * 60 * 60 * 1000); // 24 hours
      member.expirationTime = expirationTime;
      setTimeout(() => {
        member.isToday = false;
        member.expirationTime = null;
      }, expirationTime.getTime() - Date.now());
    }
  });
  next();
});

export const Clan = model('clans', clanSchema);