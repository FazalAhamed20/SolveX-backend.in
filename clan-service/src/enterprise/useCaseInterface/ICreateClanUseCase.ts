import { ClanEntity } from "../entities";

export interface ICreateClanUseCase{
    execute(data:ClanEntity):Promise<ClanEntity | null>
}