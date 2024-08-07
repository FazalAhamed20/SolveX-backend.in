import { Practice } from "../models";
import { PracticeEntity } from "@/enterprise/entities";



export const fetchPractice=async():Promise<PracticeEntity[]>=>{
    return await Practice.find()
}