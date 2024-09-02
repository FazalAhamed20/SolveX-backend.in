import { Problem } from "../models";
import { ProblemEntity } from "@/enterprise/entities";

export const problemData = async (data: ProblemEntity[]): Promise<ProblemEntity[] | null> => {

    
    
   
    const existingProblems = await Problem.find({ 
      $or: data.map(problem => ({
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        
      }))
    });

   
    const newData = data.filter(problem => 
      !existingProblems.some(existing =>
        existing.title === problem.title &&
        existing.description === problem.description &&
        existing.difficulty === problem.difficulty
        
      )
    );

    if (newData.length === 0) {
      
      return existingProblems; 
    }

   
    const result = await Problem.insertMany(newData);
    
    return result;
 
  
};
