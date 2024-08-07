interface ClanMember {
    id: string;
    name: string;
    role: string;
    avatar?: string;
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
}