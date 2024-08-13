import { ClanEntity } from "../entities";

export interface IRequestClanUseCase{
    execute(clanId:any,userId:any):Promise<ClanEntity | string | null>
}