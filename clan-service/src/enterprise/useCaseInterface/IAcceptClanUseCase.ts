import { ClanEntity } from "../entities";

export interface IAcceptClanUseCase{
    execute(clanId:any,userId:any):Promise<ClanEntity | string | null>
}