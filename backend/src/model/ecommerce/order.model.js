
import {Schema,model} from 'mongoose'

const orderItemSchema = new Schema({
    productId : {
        type : Schema.Types.ObjectId,
        ref :"Product"
    },
    quantity : {
        type : Number,
        required : true
    }
})


const orderSchema = new Schema({
    orderPrice : {
        type : Number,
        required : true
    },
    customer : {
        type : Schema.Types.ObjectId,
        ref  : "User",
    }, 
    orderItems : {
        type : [orderItemSchema]
    },
    adress : {
        type : String
    },
    status : {
        type : String,
        enum : ["PENDING","CANCELLED","DELIVERED"],
        default : "PENDING"
    }
},{timestamps: true});


export const Order = model('Order',orderSchema);

