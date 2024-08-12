import { Clan } from "@/infrastructure/database/mongo/models";
import { ObjectId } from "mongoose";

interface ClanMember {
  id: ObjectId;
  name: string;
  role?: 'member' | 'leader' | 'co-leader';
}

export default async (
  data: {
    _id?: ObjectId;
    name: string;
    description?: string;
    members?: ClanMember[];
    userId: ObjectId;
  }
) => {
  console.log(data);

  try {
    // Check if a clan with the same name or ID already exists
    const existingClan = await Clan.findOne({
      $or: [
        { name: data.name },
        { _id: data._id }
      ]
    });

    if (existingClan) {
      throw new Error("A clan with the same name or ID already exists");
    }

    let members: ClanMember[] = data.members || [];
    console.log("Initial members:", members);

    const leaderExists = members.some(member => member.id.toString() === data.userId.toString());
    console.log("Leader exists:", leaderExists);

    if (!leaderExists) {
      members.unshift({
        id: data.userId,
        name: data.name,
        role: 'leader'
      });
    } else {
      members = members.map(member =>
        member.id.toString() === data.userId.toString()
          ? { ...member, name: data.name, role: 'leader' }
          : member
      );
    }

    if (data.members) {
      members = members.map(member => {
        const existingMember = data.members?.find(m => m.id.toString() === member.id.toString());
        return existingMember
          ? { ...member, name: existingMember.name, role: existingMember.role }
          : member;
      });
    }

    const newClan = new Clan({
        _id:data._id,
      name: data.name,
      description: data.description,
      members: members
    });

    await newClan.save();
    console.log("New clan created:", newClan);
    return newClan;
  } catch (error) {
    console.error("Error creating new clan:", error);
    throw error;
  }
};