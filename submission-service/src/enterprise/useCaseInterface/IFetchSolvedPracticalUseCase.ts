import { PracticeSubmissionEntity } from "../entities"
export interface IFetchSolvedPracticalUseCase{
    execute(email:string):Promise<PracticeSubmissionEntity[] | null>
}