import { ClanEntity } from "@/enterprise/entities";
import { Clan } from '@/infrastructure/database/mongo/models';

export const requestClan = async (clanId: string, userId: string): Promise<ClanEntity | string | null> => {
    try {
        const clan = await Clan.findById(clanId);
        
        if (!clan) {
            return `Clan with ID ${clanId} not found.`;
        }

        console.log("Original clan requests:", clan.request);

       
        clan.request.push({ userId: userId, status: "Pending" });

        
        const updatedClan = await clan.save();

        console.log("Updated clan requests:", updatedClan.request);
        
        return updatedClan as unknown as ClanEntity;
    } catch (error) {
        console.error("Error in requestClan:", error);
        return null;
    }
};