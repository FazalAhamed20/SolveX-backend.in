import { ClanEntity } from "@/enterprise/entities";
import { Clan } from '@/infrastructure/database/mongo/models';

export const rejectClan = async (clanId: string, userId: string): Promise<ClanEntity | string | null> => {
    const clan = await Clan.findById(clanId);
    
    if (!clan) {
        return `Clan with ID ${clanId} not found.`;
    }

    const requestIndex = clan.request.findIndex(member => member.userId == userId);
    
    if (requestIndex === -1) {
        return `Request by user with ID ${userId} not found in clan.`;
    }


    clan.request.splice(requestIndex, 1);

 
    await clan.save();

    return clan.toObject() as ClanEntity;
};