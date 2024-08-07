import { ClanEntity } from "../entities";

export interface IDeleteMemberUseCase{
    execute(clanId:any,_id:any,memberName:any):Promise<ClanEntity | string | null>
}