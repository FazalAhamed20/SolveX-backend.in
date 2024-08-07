import { Problem } from "../models";
import { ProblemEntity } from "@/enterprise/entities";



export const fetchProblem=async():Promise<ProblemEntity[]>=>{
    return await Problem.find()
}