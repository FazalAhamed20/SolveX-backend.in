import { ClanEntity } from "@/enterprise/entities";
import { Clan, User } from '@/infrastructure/database/mongo/models';

export const requestClan = async (clanId: string, userId: string): Promise<ClanEntity | string | null> => {
    try {
        const clan = await Clan.findById(clanId);
        
        if (!clan) {
            return `Clan with ID ${clanId} not found.`;
        }

        

        const user = await User.findById(userId, 'username');


        

       
        clan.request.push({ userId: userId, status: "Pending",username:user?.username });

        
        const updatedClan = await clan.save();

        
        
        return updatedClan as unknown as ClanEntity;
    } catch (error) {
        console.error("Error in requestClan:", error);
        return null;
    }
};