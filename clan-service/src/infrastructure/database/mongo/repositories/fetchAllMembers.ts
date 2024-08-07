import { Clan, Submission } from '../models';
import mongoose from 'mongoose';

interface MemberWithSolvedProblems {
  id: mongoose.Types.ObjectId;
  name: string;
  role: string;
  solvedProblems: number;
  
}

export const fetchAllMembers = async (
  clanId: string,
  clanName: string
): Promise<MemberWithSolvedProblems[] | null> => {
  console.log('Fetching clan:', clanId, clanName);

  const clan = await Clan.findOne({ _id: clanId, name: clanName });

  if (!clan) {
    console.error('Clan not found');
    return null;
  }

  console.log('Clan found:', clan);

  const membersWithSolvedProblems = await Promise.all(
    clan.members.map(async (member) => {
      if (!member._id && !member.id) {
        console.error('Member found with undefined _id and id:', member);
        return null;
      }
  
      const solvedProblemsCount = await Submission.countDocuments({
        userId: member._id || member.id, 
        submited: 'Solved'
      });
      console.log("Solved Problems Count:", solvedProblemsCount);
  
      return {
        id: member._id || member.id,
        name: member.name || 'Unknown',
        role: member.role || 'Member',
        solvedProblems: solvedProblemsCount,
      };
    })
  );

 
  const validMembers = membersWithSolvedProblems.filter((member): member is MemberWithSolvedProblems => member !== null);

  console.log("Valid Members:", validMembers);

  return validMembers;
};