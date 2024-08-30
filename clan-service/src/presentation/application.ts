import express, { Response, Request, } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { routes } from '@/infrastructure/routes';
import errorHandler from '@/_lib/utils/middleware/errorHandler';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import notificationHandler from '@/infrastructure/socket/NotificationHandler';
import cors from 'cors';
import { dependencies } from '@/_boot/dependencies';

const app: any = express();
const server: http.Server = http.createServer(app);

const FRONTEND_URL = "https://solve-x-frontend-in.vercel.app";

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  },
  path:'/clan-socket',
 
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
notificationHandler(io);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Clan-Service ON!',
  });
});

app.use('/clan/api', routes(dependencies));

app.use(errorHandler);

export { server };  
