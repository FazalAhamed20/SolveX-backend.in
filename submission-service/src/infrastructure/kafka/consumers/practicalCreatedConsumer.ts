import { Practical } from "@/infrastructure/database/mongo/models";
import { ObjectId } from "mongoose";

export default async (
    data: Array<{
        id: ObjectId;
        title: string;
        language: string;
        isBlocked: boolean;
    }>
) => {
    try {
        for (const practicalData of data) {
            const existingPractical = await Practical.findOne({ id: practicalData.id });

            if (existingPractical) {
                
                const updatedPractical = await Practical.findOneAndUpdate(
                    { id: practicalData.id },
                    {
                        title: practicalData.title,
                        isBlocked: practicalData.isBlocked,
                        language: practicalData.language
                    },
                    { new: true }
                );
                
            } else {
                // Create new problem
                const newPractical = new Practical({
                    id: practicalData.id,
                    title: practicalData.title,
                    isBlocked: practicalData.isBlocked,
                    language: practicalData.language
                });

                
                await newPractical.save();
            }
        }
    } catch (error: any) {
        
    }
};