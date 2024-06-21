import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHanlder.js';
import {uploadOnCloudinary,deleteFromCloudinary} from '../utils/cloudinary.js';
import {Product} from '../model/ecommerce/product.models.js';



export const getOneProduct = asyncHandler(async (req,res) => {


    const {productId} = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(400,"product id is not valid")
    }

    res
    .status(200)
    .json(
        new ApiResponse(200,product,"product fetched successfully")
    )

})

export const getProductCategoryWise = asyncHandler(async (req,res) => {
    const {category} = req.params;

   
    const products = await Product.find({category  :category})

    if (products == []) {
        throw new ApiError(400,"category is not defined")
    }


    res
    .status(200)
    .json(
        new ApiResponse(200,products,"fetched products category wise")
    )
})


export const getAllProducts = asyncHandler(async (req,res) => {

    const products = await Product.find({});

    if (!products) {
        throw new ApiError(400,"there are no products")
    }

    res
    .status(200)
    .json(
        new ApiResponse(200,products,"products fetched successfully")
    )
})