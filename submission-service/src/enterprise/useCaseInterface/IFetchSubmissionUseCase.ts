
import { SubmissionEntity } from "../entities"
export interface IFetchSubmissionUseCase{
    execute(email:string,id:string):Promise<SubmissionEntity | null>
}