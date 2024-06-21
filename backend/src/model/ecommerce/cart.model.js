import {Schema,model} from 'mongoose';


// const cartItemSchema = new Schema({
//     productId : {
//         type : Schema.Types.ObjectId,
//         ref : "Product",
//         required : true
//     },
//     productCount : {
//         type : Number,
//         required : true,
//         default : 1
//     }
// })


const cartSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref  :"User",
        required : true
    },
    items : [{
        productId : {
            type : Schema.Types.ObjectId,
            ref : "Product",
            require : true
        },
        productCount : {
            type : Number,
            required : true,
            default : 1
        }
    }],
    totalPrice : {
        type : Number,
    }
},{timestamps : true});


export const Cart = model("Cart",cartSchema)