import { IDependencies } from "@/application/interfaces/IDependencies"
import { HttpStatusCode } from "axios"
import { Request, Response, NextFunction} from "express"

export const fetchSubmissionController = (dependencies: IDependencies) => {
    const { useCases: { fetchSubmissionUseCase } } = dependencies
    return async (req: Request, res: Response ,next:NextFunction) => {
        try {
            const email = req.body.email
            const id = req.body.id

            const result = await fetchSubmissionUseCase(dependencies).execute(email, id)

            console.log('Result:', result)

            if (result === null) {
                res.send({ success: false })
            } else {
                res.status(HttpStatusCode.Ok).send({ success: true, data: result.submited})
            }
        } catch (error) {
           next(error)
        }
    }
}


