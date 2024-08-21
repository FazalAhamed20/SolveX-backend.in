interface ClanMember {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    score?:number
    isToday?:boolean
  }

  interface RequestMember {
    userId:any,
    status:string,
    username:any
  }

export interface ClanEntity{
    _id?: any;
    id?:string;
    userId?: string;
    name:string;
    description:string;
    members:ClanMember[];
    trophies:string | null | undefined,
    isBlocked?:boolean
    request?:RequestMember[]
}