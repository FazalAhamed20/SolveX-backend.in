import { PracticeEntity } from "../entities";


export interface IFetchAllPracticeUseCase{
    execute():Promise<PracticeEntity[] | null>
}