import { PracticeSubmissionEntity } from "@/enterprise/entities";
import { SubmissionEntity } from "@/enterprise/entities/SubmissionEntity";




export interface IRepositories{
    submit:(data:SubmissionEntity)=>Promise<SubmissionEntity | null>
    fetchSubmission:(email:string,id:string)=>Promise<SubmissionEntity | null>
    fetchSolved:(email:string)=>Promise<SubmissionEntity[] | null>
    practicalSubmit:(data:PracticeSubmissionEntity)=>Promise<PracticeSubmissionEntity  | string>
    fetchPractical:(email:string,id:string)=>Promise<PracticeSubmissionEntity | null>
    fetchSolvedPractical:(email:string)=>Promise<PracticeSubmissionEntity[] | null>
    fetchAllSubmission: () => Promise<SubmissionEntity[] | null>;
    
}