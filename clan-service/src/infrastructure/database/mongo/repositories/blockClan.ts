import { Clan } from '../models';
import { ClanEntity } from '@/enterprise/entities';

export const blockClan = async (
  isBlocked: boolean,
  id: string,
): Promise<ClanEntity | null> => {
  try {
    const result = await Clan.updateOne(
      { _id: id },
      { $set: { isBlocked: isBlocked } },
    );

    if (result.modifiedCount > 0) {
      const updatedClan = await Clan.findOne({ _id: id }).lean(); 

      if (updatedClan) {
        const transformedClan: ClanEntity = {
            _id: updatedClan._id.toString(),
            name: updatedClan.name,
            description: updatedClan.description,
            members: updatedClan.members.map(member => ({
                id: member.id.toString(),
                name: member.name || '', 
                role: member.role || '', 
                avatar: member.avatar || '' 
              })),
            userId: updatedClan.userId.toString(),
            trophies: updatedClan.trophies || '0',
            isBlocked:updatedClan.isBlocked
        };

        console.log('Updated updatedClan', transformedClan);
        return transformedClan;
      }
    } else {
      console.log('No updatedClan found or no changes made');
    }

    return null;
  } catch (error) {
    console.error('Error blocking/unblocking updatedClan:', error);
    return null;
  }
};
