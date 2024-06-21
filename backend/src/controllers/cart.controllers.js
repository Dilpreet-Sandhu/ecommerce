import { Cart } from '../model/ecommerce/cart.model.js';
import asyncHandler from '../utils/asyncHanlder.js';
import {ApiResponse} from '../utils/apiResponse.js'
import {Product} from '../model/ecommerce/product.models.js';
import {ApiError} from '../utils/apiError.js'


export const addToCart = asyncHandler(async (req,res) => {

    //take product id from the params
    //find the cart by user id 
    //initiate the cart 
    //find the product index
    //if index is in the cart then increase the productCount
    //save the cart

    const userId = req.user?._id;

    const {productId} = req.params;



    try {
        let cart = await Cart.findOne({userId});

        if (!cart) {
            cart = await Cart.create({
                userId,
                items : []
            })
        };

        let productIdx = cart.items.findIndex(item => item.productId.toString() == productId);

        if (productIdx > -1) {
            cart.items[productIdx].productCount += 1;
        }
        else {

            const product = await Product.findById(productId);

            if (!product) {
                throw new ApiError(400,"no product found")
            }

            cart.items.push({productId,productCount : 1})
        }

        await cart.save({validateBeforeSave : false});

        res
        .status(200)
        .json(
            new ApiResponse(200,cart,"product added successfully")
        )
        
    } catch (error) {
        console.log("something went wrong" + error)
    }






})

export const removeFromCart = asyncHandler(async (req,res) => {
    //get product id from params and remove all from body
    //get the cart of the user
    //check if the cart exists 
    //get index of the product
    //check if product is already in the cart
    //remove the product if quantity is 1 or user says remove all
    //save the cart


    const {removeAll} = req.body;
    const {productId} = req.params;


    const cart = await Cart.findOne({userId : req.user?._id});


    if (!cart) {
        throw new ApiError(400,"cart not found")
    }

    const productIdx = cart.items.findIndex(item => item.productId.toString() == productId);

    if (productIdx < -1) {
        throw new ApiError(400,"product is not in the cart")
    }

    if (removeAll || cart.items[productIdx].productCount == 1) {
        cart.items.splice(productIdx,1)
    }
    else {
        cart.items[productIdx].productCount -= 1;
    }

    await cart.save({validateBeforeSave : false})

    res
    .status(200)
    .json(
        new ApiResponse(200,cart,"product removed succesffuly")
    )

})

export const viewCart = asyncHandler(async (req,res) => {
    
})