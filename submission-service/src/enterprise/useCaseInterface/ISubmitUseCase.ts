import { SubmissionEntity } from "../entities";

export interface ISubmitUseCase{
    execute(data:SubmissionEntity):Promise<SubmissionEntity | null>
}