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
import {productRouter} from './routes/product.routes.js'
import { cartRouter } from './routes/cart.routes.js';

app.use('/api/v2',userRouter);
app.use('/api/v2',productRouter);
app.use('/api/v2/cart',cartRouter)