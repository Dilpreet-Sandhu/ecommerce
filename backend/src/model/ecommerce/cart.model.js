import {Schema,model} from 'mongoose';


const cartSchema = new Schema({
    product : {
        type : Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    productCount : {
        type : Number,
        default : 0
    }
},{timestamps : true});


export const Cart = model("Cart",cartSchema)