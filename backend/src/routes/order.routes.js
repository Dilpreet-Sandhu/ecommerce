import {Router} from 'express';
import {verifyJWT} from '../middlewares/auth.middlewares.js';
import {placeOrder} from '../controllers/order.controller.js';

export const orderRouter = Router();


orderRouter.route('/placeOrder').post(verifyJWT,placeOrder)