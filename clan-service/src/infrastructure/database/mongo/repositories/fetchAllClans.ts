import { ClanEntity } from "@/enterprise/entities";
import { Clan } from "../models";

export const fetchAllClans = async (): Promise<ClanEntity[] | null> => {
  const result = await Clan.find({}).lean();
  console.log("result", result);
  
  if (!result || result.length === 0) {
    return null;
  }

  return result.map(clan => ({
    _id: clan._id.toString(),
    name: clan.name,
    description: clan.description,
    members: clan.members.map(member => ({
        id: member.id.toString(),
        name: member.name || '', 
        role: member.role || '', 
        avatar: member.avatar || '' 
      })),
    userId: clan.userId.toString(),
    trophies: clan.trophies || '0',
    isBlocked:clan.isBlocked
  }));
};