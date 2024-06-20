import {v2 as cloudinary} from 'cloudinary';
import {ApiError} from './apiError.js';
import fs from 'fs'

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME || "dofbmh6sw",
    api_key  : process.env.CLOUDINARY_API_KEY || "591147192118157",
    api_secret  :process.env.CLOUDINARY_API_SECRET  || "-4TiRTkHqoq5g_F63b4AYGaDEAM"
})


export const uploadOnCloudinary = async (filepath) => {

    const uploadedFile = await cloudinary.uploader.upload(filepath,{
        resource_type : 'auto'
    })

    try {
        if (!uploadedFile) {
            throw new ApiError(500,"couldn't upload the file")
        }
        
        fs.unlinkSync(filepath)
        return uploadedFile
    } catch (error) {
        fs.unlinkSync(filepath)
        console.log(error)
        return null
    }

}