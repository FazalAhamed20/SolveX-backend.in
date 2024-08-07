import {PracticeEntity  } from "../entities";

export interface IBlockPracticeUseCase{
    execute(data:PracticeEntity):Promise<PracticeEntity | null>
}