import {Router} from 'express';
import { addToCart, removeFromCart, viewCart } from '../controllers/cart.controllers.js';
import {verifyJWT} from '../middlewares/auth.middlewares.js';

export const cartRouter = Router();

cartRouter.route('/add/:productId').post(verifyJWT,addToCart)
cartRouter.route('/remove/:productId').post(verifyJWT,removeFromCart)
cartRouter.route('/view').get(verifyJWT,viewCart)