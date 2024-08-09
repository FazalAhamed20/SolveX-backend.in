import { ClanEntity } from "@/enterprise/entities";
import { Clan } from '@/infrastructure/database/mongo/models';
import { User } from '@/infrastructure/database/mongo/models';

export const createClan = async (data: ClanEntity): Promise<ClanEntity | null> => {
  
  const existingClan = await Clan.findOne({
    name: data.name,
    description: data.description
  });

  if (existingClan) {
    return null;
  }

 
  const user = await User.findById(data.userId);
  if (!user) {
    throw new Error('User not found');
  }

  
  const userClanCount = await Clan.countDocuments({ userId: data.userId });
  if (userClanCount >= 2) {
    throw new Error('User has exceeded the limit of creating two clans');
  }

 
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

  
  const clanData = {
    ...data,
    members: [memberData]
  };

 
  const newClan = new Clan(clanData);
  const savedClan = await newClan.save();

  return savedClan.toObject() as ClanEntity;
};
