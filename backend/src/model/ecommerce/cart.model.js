import {Schema,model} from 'mongoose';


const cartItemSchema = new Schema({
    productId : {
        type : Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    productCount : {
        type : Number,
        required : true,
        default : 1
    }
})


const cartSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref  :"User",
        required : true
    },
    items : [cartItemSchema]
},{timestamps : true});


export const Cart = model("Cart",cartSchema)