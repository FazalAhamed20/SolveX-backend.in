import { IDependencies } from "@/application/interfaces/IDependencies";
import { getAllPracticeController } from "./getAllPracticeController";
import { practicalListController } from "./practicalListController";
import { blockpracticeController } from "./blockPracticeController";
import {fetchPracticeController} from './fetchPracticeController'



export const controller=(dependencies:IDependencies)=>{
    return{
        getAllPractice:getAllPracticeController(dependencies),
        practicalList:practicalListController(dependencies),
        blockPractice:blockpracticeController(dependencies),
        fetchPractice:fetchPracticeController()
    }

}