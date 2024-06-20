import {Schema,model} from 'mongoose';
import jwt from "jsonwebtoken";
import passwordHash from 'password-hash';
import bcrpyt from 'bcrypt';

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    },
    profilePic : {
        type : String,
        required : true
    }

},{timestamps:true});

userSchema.pre("save",async function(next) {
    if (this.isModified(this.password)) next();

    this.password =  passwordHash.generate(this.password)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return passwordHash.verify(password,this.password)
}

userSchema.methods.generateAccessToken = async function() {
    return jwt.sign({
        _id : this._id,
        username : this.username,
        email : this.email,
    },
    process.env.ACCESS_TOKEN_SECRET
    ,{
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
})
}


userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET
    ,{
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
})
}

export const User = model('User',userSchema)

