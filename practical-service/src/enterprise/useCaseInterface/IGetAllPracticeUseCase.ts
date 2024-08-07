import { PracticeEntity } from "../entities";

export interface IGetAllPracticeUseCase{
    execute(data:PracticeEntity[]):Promise<PracticeEntity[] | null>
}