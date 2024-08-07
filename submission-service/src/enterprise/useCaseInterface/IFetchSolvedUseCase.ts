import { SubmissionEntity } from "../entities"
export interface IFetchSolvedUseCase{
    execute(email:string):Promise<SubmissionEntity[] | null>
}