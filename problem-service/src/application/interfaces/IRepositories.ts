import { ProblemEntity } from "@/enterprise/entities";



export interface IRepositories{
    problemData:(data:ProblemEntity[])=>Promise<ProblemEntity[] | null>
    fetchProblem:()=>Promise<ProblemEntity[] | null>
    blockProblem:(data:ProblemEntity)=>Promise<ProblemEntity | null>
}