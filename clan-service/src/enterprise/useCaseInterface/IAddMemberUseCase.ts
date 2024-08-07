import { ClanEntity } from "../entities";

export interface IAddMemberUseCase{
    execute(data:ClanEntity):Promise<ClanEntity | string | null>
}