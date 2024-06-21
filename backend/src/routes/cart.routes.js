import {Router} from 'express';
import { addToCart, removeFromCart } from '../controllers/cart.controllers.js';
import {verifyJWT} from '../middlewares/auth.middlewares.js';

export const cartRouter = Router();

cartRouter.route('/add/:productId').post(verifyJWT,addToCart)
cartRouter.route('/remove/:productId').post(verifyJWT,removeFromCart)