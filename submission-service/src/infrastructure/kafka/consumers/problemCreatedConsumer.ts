import { Problem } from "@/infrastructure/database/mongo/models";
import { ObjectId } from "mongoose";

export default async (
    data: Array<{
        id: ObjectId;
        title: string;
        description: string;
        difficulty: string;
        language: [object];
        isBlocked: boolean;
    }>
) => {
    try {
        for (const problemData of data) {
            const existingProblem = await Problem.findOne({ id: problemData.id });

            if (existingProblem) {
                // Update existing problem
                const updatedProblem = await Problem.findOneAndUpdate(
                    { id: problemData.id },
                    {
                        title: problemData.title,
                        description: problemData.description,
                        difficulty: problemData.difficulty,
                        isBlocked: problemData.isBlocked,
                        language: problemData.language
                    },
                    { new: true }
                );
                console.log("Problem updated:", updatedProblem);
            } else {
                // Create new problem
                const newProblem = new Problem({
                    id: problemData.id,
                    title: problemData.title,
                    description: problemData.description,
                    difficulty: problemData.difficulty,
                    isBlocked: problemData.isBlocked,
                    language: problemData.language
                });

                console.log("New problem created:", newProblem);
                await newProblem.save();
            }
        }
    } catch (error: any) {
        console.log(error?.message);
    }
};