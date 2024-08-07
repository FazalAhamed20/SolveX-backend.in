import { ProblemEntity } from "../entities";

export interface IFetchAllProblemUseCase{
    execute():Promise<ProblemEntity[] | null>
}