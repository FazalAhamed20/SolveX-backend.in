import { ClanEntity } from "@/enterprise/entities";
import { Clan } from '@/infrastructure/database/mongo/models';
import { User } from '@/infrastructure/database/mongo/models';

export const createClan = async (data: ClanEntity): Promise<ClanEntity | null> => {
  // Check if the clan already exists
  const existingClan = await Clan.findOne({
    name: data.name,
    description: data.description
  });

  if (existingClan) {
    return null;
  }

  // Find the user
  const user = await User.findById(data.userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Check if the user has already created more than 2 clans
  const userClanCount = await Clan.countDocuments({ userId: data.userId });
  if (userClanCount >= 2) {
    throw new Error('User has exceeded the limit of creating two clans');
  }

  // Prepare the member data
  const memberData: {
    id: typeof user._id;
    name: string;
    role: string;
    avatar?: string;
  } = {
    id: user._id,
    name: user.username,
    role: 'leader'
  };

  if (user.profileImage) {
    memberData.avatar = user.profileImage;
  }

  // Create the clan data
  const clanData = {
    ...data,
    members: [memberData]
  };

  // Save the new clan
  const newClan = new Clan(clanData);
  const savedClan = await newClan.save();

  return savedClan.toObject() as ClanEntity;
};
