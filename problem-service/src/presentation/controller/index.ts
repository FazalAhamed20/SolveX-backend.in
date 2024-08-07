import { IDependencies } from "@/application/interfaces/IDependencies";
import { getAllProblemsController } from "./getAllProblemsController";
import { blockproblemController } from "./blockProblemController";
import {problemListController} from './problemListController'
import { fetchProblemsController } from "./fetchProblemController";
import {chatBotController} from './chatBotConttroller'


export const controller=(dependencies:IDependencies)=>{
    return {
        getAllProblems:getAllProblemsController(dependencies),
        blockProblem:blockproblemController(dependencies),
        problemList:problemListController(dependencies),
        fetchProblem:fetchProblemsController(),
        chatBot:chatBotController()
    }
}