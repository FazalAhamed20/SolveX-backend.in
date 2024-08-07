import { ClanEntity } from "../entities";

export interface IBlockClanUseCase{
    execute(isBlocked:boolean,id:string):Promise<ClanEntity | null>
}