import { ClanEntity } from "@/enterprise/entities";
import { Clan } from '@/infrastructure/database/mongo/models';

export const deleteMember = async (clanId: string, memberId: string, memberName: string): Promise<ClanEntity | string | null> => {
    
       
        const clan = await Clan.findById(clanId);
        
        
        if (!clan) {
            return `Clan with ID ${clanId} not found.`;
        }

      
        const memberIndex = clan.members.findIndex(
            (member) => member.id.toString() === memberId && member.name === decodeURIComponent(memberName)
        );

        
        if (memberIndex === -1) {
            return `Member with name ${memberName} not found in the clan.`;
        }

       
        clan.members.splice(memberIndex, 1);

      
        const updatedClan = await clan.save();
        
       console.log("updated clan",updatedClan)
        return updatedClan.toObject() as ClanEntity;

   
};