
export interface IFetchAllMembersUseCase{
    execute(id:string,name:string):Promise<any[] | null>
}