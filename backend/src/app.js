import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';


export const app = express();

app.use(express.json({limit: '16kb'}));
app.use(cookieParser());
app.use(express.urlencoded());
app.use(cors({origin : process.env.CORS_ORIGIN}));


//import userRouter
import {userRouter} from './routes/user.routes.js';


app.use('/api/v2',userRouter)