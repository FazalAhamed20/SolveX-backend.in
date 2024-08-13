import {  Types } from 'mongoose';

export interface MessageEntity {
    text:string,
    sender: {
        _id:Types.ObjectId,
        name:string
    },
    clanId: Types.ObjectId,
    createdAt?:Date,
    updatedAt?: Date
}