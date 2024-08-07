import { User } from "@/_lib/utils/types";


export interface SubmissionEntity {
   
    id:string;
    code?:string;
    title:string;
    language:string[];
    difficulty:string;
    email:string;
    submited?:string ;
    isAttempt?:boolean;
    userId: User | string;
    username?:string
   
  }