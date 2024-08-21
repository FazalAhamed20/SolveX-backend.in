
import { Clan } from '../models';



export const fetchAllMembers = async (
  clanId: string,
  clanName: string
): Promise<any[] | null> => {
  console.log('Fetching clan:', clanId, clanName);

  const clan = await Clan.findOne({ _id: clanId, name: clanName });

  if (!clan) {
    console.error('Clan not found');
    return null;
  }

  console.log('Clan found:', clan);

  return clan.members as unknown as any[]

  
    }
  

 
