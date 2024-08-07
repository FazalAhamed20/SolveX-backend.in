import { ObjectId } from "mongoose";

export interface ProblemEntity {
  _id?: ObjectId;
    id: string;
    title: string;
    description: string;
    difficulty: string;
    tags: string[];
    code:string,
    javascript:true,
    isBlocked:boolean,
    isPremium:boolean
  }
  