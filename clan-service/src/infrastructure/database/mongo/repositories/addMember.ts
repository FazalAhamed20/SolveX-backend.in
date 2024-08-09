import { ClanEntity } from "@/enterprise/entities";
import { Clan } from '@/infrastructure/database/mongo/models';

export const addMember = async (data: ClanEntity): Promise<ClanEntity | string | null> => {
    
        console.log('Adding members to clan:', data);
        const clan = await Clan.findOne({ _id: data._id, name: data.name });
        console.log("Found clan:", clan);

        if (!clan) {
            console.log("Clan not found");
            return null;
        }

        
        const existingMemberIds = clan.members.map((member: any) => member.id.toString());

        console.log("Existing member IDs:", existingMemberIds);

      
        const newMembers = data.members?.filter((newMember: any) => {
            const newMemberId = newMember.id.toString(); 
            if (existingMemberIds.includes(newMemberId)) {
                console.log(`User ${newMember.username} is already in the clan.`);
                return false; 
            }
            return true; 
        });

        if (!newMembers || newMembers.length === 0) {
            console.log("No new members to add or all members already exist.");
            return "Member already in the clan";
        }

       
        clan.members.push(...newMembers);

        const updatedClan = await clan.save();

        console.log("Members added successfully");
        return updatedClan.toObject() as ClanEntity;
   
};
