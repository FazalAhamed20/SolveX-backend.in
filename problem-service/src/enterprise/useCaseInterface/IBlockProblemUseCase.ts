import { ProblemEntity } from "../entities";

export interface IBlockProblemUseCase{
    execute(data:ProblemEntity):Promise<ProblemEntity | null>
}