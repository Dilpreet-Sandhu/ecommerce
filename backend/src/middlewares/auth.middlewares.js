import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHanlder.js';
import {User} from '../model/ecommerce/user.models.js';
import {ApiError} from '../utils/apiError.js';


export const verifyJWT = asyncHandler(async (req,res,next) => {
    try {
        const token = req.cookies?.accessToken;
    
        if (!token) {
            throw new ApiError(400,"no acess token found")
        }
    
        const decodedToken = jwt.decode(token,process.env.ACCESS_TOKEN_SECRET);
    
    
        const user = await User.findById(decodedToken._id);
    
        if (!user) {
            throw new ApiError(400,"no user found")
        }
    
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
    }

})