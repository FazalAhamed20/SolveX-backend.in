import { SubmissionEntity } from "../entities"
export interface IFetchAllSubmissionUseCase{
    execute():Promise<SubmissionEntity[] | null>
}