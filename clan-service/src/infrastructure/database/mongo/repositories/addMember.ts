import { ClanEntity } from "@/enterprise/entities";
import { Clan } from '@/infrastructure/database/mongo/models';

export const addMember = async (data: ClanEntity): Promise<ClanEntity | string | null> => {
    
        
        const clan = await Clan.findOne({ _id: data._id, name: data.name });
        

        if (!clan) {
            
            return null;
        }

        
        const existingMemberIds = clan.members.map((member: any) => member.id.toString());

        

      
        const newMembers = data.members?.filter((newMember: any) => {
            const newMemberId = newMember.id.toString(); 
            if (existingMemberIds.includes(newMemberId)) {
                
                return false; 
            }
            return true; 
        });

        if (!newMembers || newMembers.length === 0) {
            
            return "Member already in the clan";
        }

       
        clan.members.push(...newMembers);

        const updatedClan = await clan.save();

        
        return updatedClan.toObject() as ClanEntity;
   
};
