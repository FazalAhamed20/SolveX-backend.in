import {  Types } from 'mongoose';


export interface Reaction{
    memberId:string,
    emoji:string

}

export interface MessageEntity {
    text:string,
    sender: {
        _id:Types.ObjectId,
        name:string
    },
    clanId: Types.ObjectId,
    createdAt?:Date,
    updatedAt?: Date
    reactions?:Reaction[]
    status?:string
}