import { ClanEntity } from "../entities";

export interface IRejectClanUseCase{
    execute(clanId:any,userId:any):Promise<ClanEntity | string | null>
}