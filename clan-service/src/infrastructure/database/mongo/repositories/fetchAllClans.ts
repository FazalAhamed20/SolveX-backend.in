import { ClanEntity } from "@/enterprise/entities";
import { Clan } from "../models";

export const fetchAllClans = async (): Promise<ClanEntity[] | null> => {
  const result = await Clan.find({}).lean();
  
  
  if (!result || result.length === 0) {
    return null;
  }

  
  return result as unknown as ClanEntity[]
};