import { Clan } from "@/infrastructure/database/mongo/models";


interface ClanData {
  _id: string;
  name: string;
  description: string;
  members: Array<{
    id: string;
    name: string;
    role: 'member' | 'leader' | 'co-leader';
  }>;
  userId: string;
  trophies: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default async (clanData: ClanData) => {
  console.log("Update clan request:", clanData);

  try {
    const clanId = clanData._id;
    const clan = await Clan.findById(clanId);

    if (!clan) {
      throw new Error("Clan not found");
    }
    clan.set('name', clanData.name);
    clan.set('description', clanData.description);
    clan.set('isBlocked', clanData.isBlocked);

    const updatedMembers = clanData.members.map(member => ({
      id: member.id,
      name: member.name,
      role: member.role,
      joinedAt: new Date() 
    }));

    clan.set('members', updatedMembers);
    await clan.save();

    console.log("Clan updated:", clan);
    return clan;
  } catch (error) {
    console.error("Error updating clan:", error);
    throw error;
  }
};