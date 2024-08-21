import { ClanEntity } from "@/enterprise/entities";
import { Clan} from '@/infrastructure/database/mongo/models';
import cron from 'node-cron';

export const completeQuiz = async (clanId: string, userId: string,score:number): Promise<ClanEntity | string | null> => {
    const clan = await Clan.findById(clanId);
    
    if (!clan) {
        return `Clan with ID ${clanId} not found.`;
    }

    const member = clan.members.find((m) => m.id.toString() === userId);

    if (!member) {
        return `Member with ID ${userId} not found in the clan.`;
    }

    member.score += score;
    member.isToday = true;
    member.createdAt = new Date(); 

    await clan.save();

   
    cron.schedule('0 0 * * *', async () => {
        const clan = await Clan.findById(clanId);
        const member = clan?.members.find((m) => m.id.toString() === userId);
      
        if (member) {
          member.isToday = false;
          await clan?.save();
        }
      });
    return clan as unknown as ClanEntity;
};