import express,{Application} from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import proxy from 'express-http-proxy'
import morgan from "morgan"


const app:Application = express();
const port = 8000;

const corsOptions = {
    origin: "https://solve-x-frontend-in.vercel.app" ,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', proxy('http://localhost:3000/'));
app.use('/problem', proxy('http://localhost:3001/'));
app.use('/submission', proxy('http://localhost:3002/'));
app.use('/practicals', proxy('http://localhost:3003/'));
app.use('/clan', proxy('http://localhost:3004/'));
app.use('/payment', proxy('http://localhost:3005/'));
app.use('/chat', proxy('http://localhost:3006/'));


app.listen(port, () => {
    console.log('Gateway running successfully');
});