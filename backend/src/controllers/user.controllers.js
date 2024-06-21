import asyncHandler from "../utils/asyncHanlder.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../model/ecommerce/user.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import passwordHash from "password-hash";

export const registerUser = asyncHandler(async (req, res) => {
  //get data from the body
  //check validation
  //create user from model

  const { username, email, password } = req.body;

  const filePath = req.file.path;

  const profilePic = await uploadOnCloudinary(filePath);

  if (!profilePic) {
    throw new ApiError(400, "profile pic needed");
  }

  if ([username, email, password].some((data) => data == "")) {
    throw new ApiError(400, "all the fields are required");
  }

  const user = await User.create({
    username,
    email,
    password,
    profilePic: profilePic.url,
  });

  res.status(200).json(new ApiResponse(200, user, "user created Successfully"));
});

const generateAccessAndRefresh = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(500, "user not found");
  }

  const isPasswordValid = user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "wrong password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefresh(
    user._id
  );

  if (!accessToken && !refreshToken) {
    throw new ApiError(500, "couldn't generate accessToken and refreshToken");
  }

  const newUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, newUser, "userLoggedIn"));
});

export const logOutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(400, "you are not logged in");
  }

  user.refreshToken = "";
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .clearCookie("accessToken", process.env.ACCESS_TOKEN_SECRET)
    .clearCookie("refreshToken", process.env.REFRESH_TOKEN_SECRET)
    .json(new ApiResponse(200, {}, "user logged out"));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword && !newPassword) {
    throw new ApiError(400, "both fields are required");
  }

  const user = await User.findById(req.user?._id);

  const isPasswordValid = user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "password is wrong");
  }

  user.password = newPassword;
  user.save({ validateBeforeSave: true });

  res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed successfully"));
});

export const changeUserDetails = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    throw new ApiError(400, "username and password are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username: username,
        email: email,
      },
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json(new ApiResponse(200, user, "user details changed successsfully"));
});

export const changeUserProfile = asyncHandler(async (req, res) => {
  const filePath = req.file.path;

  if (!filePath) {
    throw new ApiError(400, "must provide profile pic");
  }

  const oldUser = await User.findById(req.user?._id)
  const profilePic = await uploadOnCloudinary(filePath);

  const deletedFile = await deleteFromCloudinary(oldUser.profilePic);

  if (!deletedFile) {
    throw new ApiError(500, "couldn't change profile pic");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        profilePic: profilePic.url,
      },
    },
    {
      new: true,
    }
  );

  
  res
  .status(200)
  .json(
    new ApiResponse(200,user,"user profile changed successfully")
  )
});
