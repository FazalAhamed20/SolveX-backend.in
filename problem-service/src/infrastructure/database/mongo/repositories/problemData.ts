import { Problem } from "../models";
import { ProblemEntity } from "@/enterprise/entities";

export const problemData = async (data: ProblemEntity[]): Promise<ProblemEntity[] | null> => {

    console.log("repo", data);
    
   
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
      console.log("All problems already exist, skipping insert.");
      return existingProblems; 
    }

   
    const result = await Problem.insertMany(newData);
    console.log("Inserted new problems:", result);
    return result;
 
  
};
