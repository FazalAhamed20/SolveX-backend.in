import { Practice } from "../models";
import { PracticeEntity } from "@/enterprise/entities";

export const practiceData = async (data: PracticeEntity[]): Promise<PracticeEntity[] | null> => {
  
    console.log("repo", data);
    
   
    const existingPactices = await Practice.find({ 
      $or: data.map(practice => ({
        title: practice.title,
        description: practice.description,
       
        
      }))
    });

   
    const newData = data.filter(practice => 
      !existingPactices.some(existing =>
        existing.title === practice.title &&
        existing.description === practice.description 
       
        
      )
    );

    if (newData.length === 0) {
      console.log("All problems already exist, skipping insert.");
      return existingPactices; 
    }

   
    const result = await Practice.insertMany(newData);
    console.log("Inserted new practice:", result);
    return result;

};