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
                console.log("Practical updated:", updatedPractical);
            } else {
                // Create new problem
                const newPractical = new Practical({
                    id: practicalData.id,
                    title: practicalData.title,
                    isBlocked: practicalData.isBlocked,
                    language: practicalData.language
                });

                console.log("New problem created:", newPractical);
                await newPractical.save();
            }
        }
    } catch (error: any) {
        console.log(error?.message);
    }
};