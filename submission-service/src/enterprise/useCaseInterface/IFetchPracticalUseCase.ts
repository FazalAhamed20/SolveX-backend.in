
import { PracticeSubmissionEntity } from "../entities"
export interface IFetchPracticalUseCase{
    execute(email:string,id:string):Promise<PracticeSubmissionEntity | null>
}