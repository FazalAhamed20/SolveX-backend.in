import { ClanEntity } from "../entities";

export interface IFetchAllClansUseCase{
    execute():Promise<ClanEntity[] | null>
}