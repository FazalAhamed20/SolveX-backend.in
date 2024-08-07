import express, { Response, Request, Application } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { dependencies } from '@/_boot/dependencies';
import { routes } from '@/infrastructure/routes';
import errorHandler from '@/_lib/utils/middleware/errorHandler';
import morgan from 'morgan'
import { HttpStatusCode } from '../../../common/utils/httpStatusCodes';

  



const app: Application = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.get('/', (req: Request, res: Response) => {
  res.status(HttpStatusCode.OK).json({
    message: 'Auth Service ON!',
  });
});

app.use('/api', routes(dependencies));

app.use(errorHandler);

export default app;
