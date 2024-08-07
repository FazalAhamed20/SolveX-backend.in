import { PracticeSubmissionEntity } from "../entities";

export interface IPracticalSubmitUseCase{
    execute(data:PracticeSubmissionEntity):Promise<PracticeSubmissionEntity | string>
}