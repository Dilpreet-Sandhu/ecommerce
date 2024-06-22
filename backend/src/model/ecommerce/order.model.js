
import {Schema,model} from 'mongoose'



const orderSchema = new Schema({
    
    userId : {
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    products : [{
        productId : {
            type : Schema.Types.ObjectId,
            ref : "Product",
        },
        productsCount : {
            type : Number,
            default : 1
        },
        productPrice : {
            type : Number,
            required : true
        },
        title  :{
            type : String,
            required : true
        },
        image : {
            type : String
        }
    }],
    totalPrice : {
        type : Number,
        required : true
    },
    taxPercentage : {
        type : Number
    }
    ,
    shippingPrice : {
        type : Number
    },
    shippingAdress : {
        type : String,
        required : true
    },
    paymentMethod : {
        type : String,
        required : true
    },
    state : {
        type : String,
        enum : ["CANCELLED","PENDING","DELIVERED"]
    },
    deliveredAt : {
        type : Date
    }



},{timestamps: true});


export const Order = model('Order',orderSchema);

