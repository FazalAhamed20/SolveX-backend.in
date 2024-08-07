import { ObjectId } from "mongoose";

export interface PracticeEntity {
  _id?: ObjectId;
    id: string;
    title: string;
    quickTips:string[];
    videoUrl:string,
    language:string
    
    description: string;
    
    
    isBlocked:boolean
  }