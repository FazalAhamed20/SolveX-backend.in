import { PracticeEntity } from "@/enterprise/entities";



export interface IRepositories{
    practiceData:(data:PracticeEntity[])=>Promise<PracticeEntity[] | null>
    fetchPractice:()=>Promise<PracticeEntity[] | null>
    blockPractice:(data:PracticeEntity)=>Promise<PracticeEntity | null>
}