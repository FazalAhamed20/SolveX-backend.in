import { Practice } from "../models";
import { PracticeEntity } from "@/enterprise/entities";

export const practiceData = async (data: PracticeEntity[]): Promise<PracticeEntity[] | null> => {
  
    
    
   
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
      
      return existingPactices; 
    }

   
    const result = await Practice.insertMany(newData);
    
    return result;

};