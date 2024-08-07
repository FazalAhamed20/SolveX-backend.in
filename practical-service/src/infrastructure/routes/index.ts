import { Router } from "express";
import {controller} from '@/presentation/controller'
import { IDependencies } from "@/application/interfaces/IDependencies";



export const routes = (dependencies:IDependencies) => {
  const {getAllPractice,practicalList,blockPractice,fetchPractice}=controller(dependencies)
    
  
    const router = Router()
    router.route('/practice').get(getAllPractice)
    router.route('/practicelist').get(practicalList)
    router.route('/blockPractice').post(blockPractice)
    router.route('/fetchPractice/:id').get(fetchPractice)
   
   
    
  
  
    return router
  }