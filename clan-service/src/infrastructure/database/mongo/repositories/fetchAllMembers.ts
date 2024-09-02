
import { Clan } from '../models';



export const fetchAllMembers = async (
  clanId: string,
  clanName: string
): Promise<any[] | null> => {
  

  const clan = await Clan.findOne({ _id: clanId, name: clanName });

  if (!clan) {
    console.error('Clan not found');
    return null;
  }

  

  return clan.members as unknown as any[]

  
    }
  

 
