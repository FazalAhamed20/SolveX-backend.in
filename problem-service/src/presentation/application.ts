import express, { Response, Request, Application } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { dependencies } from '@/_boot/dependencies'
import { routes } from '@/infrastructure/routes'

import checkUserBlockedMiddleware from '@/_lib/utils/middleware/checkUserBlockMiddleware';
import errorHandler from '@/_lib/utils/middleware/errorHandler'
import { HttpStatusCode } from '@/_lib/httpStatusCode/httpStatusCode'




const app: Application = express()

app.use(express.json())
app.use(cookieParser())
app.use(checkUserBlockedMiddleware())
app.use(express.urlencoded({ extended: true }))

app.use(helmet())


app.get('/', (req: Request, res: Response) => {
  res.status(HttpStatusCode.OK).json({
    message: 'Problem Service ON!',
  })
})

app.use('/problem/api', routes(dependencies))
app.use(errorHandler);




export default app