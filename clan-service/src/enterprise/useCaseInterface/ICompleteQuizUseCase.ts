import { ClanEntity } from "../entities";

export interface ICompleteQuizClanUseCase{
    execute(clanId:any,userId:any,score:number):Promise<ClanEntity | string | null>
}