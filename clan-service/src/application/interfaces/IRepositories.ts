import { ClanEntity, UserEntity } from "@/enterprise/entities";



export interface IRepositories{
    createClan:(data:ClanEntity)=>Promise<ClanEntity | null>
    fetchAllClans:()=>Promise<ClanEntity[] | null>
    fetchAllMembers:(id:string,name:string)=>Promise<any[] | null>
    fetchAllUsers:()=>Promise<UserEntity[] | null>
    addMember:(data:ClanEntity)=>Promise<ClanEntity | string | null>
    deleteMember:(clanId:any,_id:any,memberName:any)=>Promise<ClanEntity | string | null>
    blockClan:(isBlocked:boolean,id:string)=>Promise<ClanEntity | null>
    requestClan:(clanId:any,userId:any)=>Promise<ClanEntity | string | null>
    acceptClan:(clanId:any,userId:any)=>Promise<ClanEntity | string | null>
   
  
    
}