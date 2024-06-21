import { Cart } from '../model/ecommerce/cart.model.js';
import asyncHandler from '../utils/asyncHanlder.js';
import {ApiResponse} from '../utils/apiResponse.js'




export const addToCart = asyncHandler(async (req,res) => {

    const {productId} = req.params;



    const cart = await Cart.create({
        product : productId,
        productCount : 1
    })

   

    res
    .status(200)
    .json(
        new ApiResponse(200,cart,"product added to cart successfully")
    )


})