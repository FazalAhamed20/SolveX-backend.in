import { IDependencies } from "@/application/interfaces/IDependencies"
import { HttpStatusCode } from "axios"
import { Request, Response, NextFunction} from "express"

export const fetchPracticalController = (dependencies: IDependencies) => {
    const { useCases: { fetchPracticalUseCase } } = dependencies
    return async (req: Request, res: Response ,next:NextFunction) => {
        try {
            const email = req.body.email
            const id = req.body.id

            const result = await fetchPracticalUseCase(dependencies).execute(email, id)

            

            if (result === null) {
                res.send({ success: false })
            } else {
                res.status(HttpStatusCode.Ok).send({ success: true, data: result.isCompleted})
            }
        } catch (error) {
           next(error)
        }
    }
}


