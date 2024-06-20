import {Router} from 'express';
import {changePassword, changeUserDetails, changeUserProfile, logOutUser, loginUser, registerUser} from '../controllers/user.controllers.js';
import {upload} from '../middlewares/multer.middleware.js'
import {verifyJWT} from '../middlewares/auth.middlewares.js'
export const userRouter = Router();


userRouter.route('/registeruser').post(upload.single("profilePic"),registerUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/logout').post(verifyJWT,logOutUser)
userRouter.route('/changePass').post(verifyJWT,changePassword)
userRouter.route('/changeUserDetails').patch(verifyJWT,changeUserDetails)
userRouter.route('/changeProfile').patch(verifyJWT,upload.single("profilePic"),changeUserProfile)