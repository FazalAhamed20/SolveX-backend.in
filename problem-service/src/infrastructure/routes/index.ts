import { Router } from "express";
import {controller} from '@/presentation/controller'
import {IDependencies} from '@/application/interfaces/IDependencies'



export const routes = (dependencies: IDependencies) => {
    const { getAllProblems,blockProblem,problemList,fetchProblem,chatBot} = controller(dependencies)
  
    const router = Router()
   
    router.route('/problems').get(getAllProblems)
    router.route('/blockProblem').post(blockProblem)
    router.route('/problemlist').get(problemList)
    router.route('/fetchProblem/:id-:title').get(fetchProblem)
    router.route('/chat').post(chatBot)
   
    
  
  
    return router
  }