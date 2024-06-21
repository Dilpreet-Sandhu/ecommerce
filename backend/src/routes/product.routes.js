import {Router} from 'express'
import {getAllProducts, getOneProduct,getProductCategoryWise} from '../controllers/product.controllers.js'

export const productRouter = Router();

productRouter.route('/products').get(getAllProducts)
productRouter.route('/:productId').get(getOneProduct)
productRouter.route('/product/:category').get(getProductCategoryWise)
