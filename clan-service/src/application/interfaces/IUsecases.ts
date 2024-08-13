import {
    ICreateClanUseCase,
    IFetchAllClansUseCase,
    IFetchAllMembersUseCase,
    IFetchAllUsersUseCase,
    IAddMemberUseCase,
    IDeleteMemberUseCase,
    IBlockClanUseCase,
    IRequestClanUseCase
} from '@/enterprise/useCaseInterface'



export interface IUseCases{
    createClanUseCase:(dependencies)=>ICreateClanUseCase
    fetchAllClansUseCase:(dependencies)=>IFetchAllClansUseCase
    fetchAllMembersUseCase:(dependencies)=>IFetchAllMembersUseCase
    fetchAllUsersUseCase:(dependencies)=>IFetchAllUsersUseCase
    addMemberUseCase:(dependencies)=>IAddMemberUseCase
    deleteMemberUseCase:(dependencies)=>IDeleteMemberUseCase
    blockClanUseCase:(dependencies)=>IBlockClanUseCase
    requestClanUseCase:(dependencies)=>IRequestClanUseCase
   
   
}