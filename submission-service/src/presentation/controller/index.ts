import { IDependencies } from "@/application/interfaces/IDependencies";

import { runController } from "./runController";
import { submitController } from "./submitController";
import { fetchSubmissionController } from "./fetchSubmissionController";
import { fetchSolvedController } from "./fetchSolvedController";
import { practicalRunController } from "./practicalRunController";
import { fetchPracticalController } from "./fetchPracticalController";
import { fetchSolvedPracticalController } from "./fetchSolvedPracticalsController";
import { fetchAllSubmissionController } from "./fetchAllSubmissionController";




export const controller=(dependencies:IDependencies)=>{
    return{
        run:runController(dependencies),
        submit:submitController(dependencies),
        fetchSubmission:fetchSubmissionController(dependencies),
        fetchSolved:fetchSolvedController(dependencies),
        practicalRun:practicalRunController(dependencies),
        fetchPractical:fetchPracticalController(dependencies),
        fetchSolvedPracticals:fetchSolvedPracticalController(dependencies),
        fetchAllSubmission:fetchAllSubmissionController(dependencies)
        
    }
}