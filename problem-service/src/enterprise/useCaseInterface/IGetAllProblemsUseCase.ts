import { ProblemEntity } from "../entities";

export interface IGetAllProblemsUseCase{
    execute(data:ProblemEntity[]):Promise<ProblemEntity[] | null>
}