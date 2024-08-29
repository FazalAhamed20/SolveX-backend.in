import express, { Response, Request, Application } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { dependencies } from '@/_boot/dependencies'
import { routes } from '@/infrastructure/routes'
import errorHandler from '@/_lib/utils/middleware/errorHandler'
import morgan from 'morgan'




const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'));
app.use(helmet())

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Submission-Service ON!',
  })
})

app.use('/submission/api', routes(dependencies))
app.use(errorHandler)




export default app