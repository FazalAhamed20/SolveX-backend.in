import { UserEntity } from "../entities";

export interface IFetchAllUsersUseCase{
    execute():Promise<UserEntity[] | null>
}