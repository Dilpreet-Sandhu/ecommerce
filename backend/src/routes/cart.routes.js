import {Router} from 'express';
import { addToCart } from '../controllers/cart.controllers.js';


export const cartRouter = Router();

cartRouter.route('/add/:productId').post(addToCart)