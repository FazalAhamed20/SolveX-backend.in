import { ClanEntity } from "@/enterprise/entities";
import { Clan, User } from '@/infrastructure/database/mongo/models';

export const acceptClan = async (clanId: string, userId: string): Promise<ClanEntity | string | null> => {
 
      
        const clan = await Clan.findById(clanId);
        
     
        if (!clan) {
            return `Clan with ID ${clanId} not found.`;
        }

        
        const requestIndex = clan.request.findIndex(
            (request) => request && request.userId && request.userId.toString() === userId.toString()
        );
        
       
        if (requestIndex === -1) {
            return `No request found for user ID ${userId} in clan ID ${clanId}.`;
        }

        const [request] = clan.request.splice(requestIndex, 1);

     
        const user = await User.findById(request.userId);
        const userName = user ? user.username : 'Unknown User';
        const userAvatar = user ? user.profileImage : '';

     
        clan.members.push({
            id: request.userId,
            name: userName,
            role: 'member', 
            avatar: userAvatar, 
        });

      
        return await clan.save() as unknown as ClanEntity;

    
};