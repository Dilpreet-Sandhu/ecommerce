
import {Schema,model} from 'mongoose'



const orderSchema = new Schema({
   
    products : [{
        
    }]


},{timestamps: true});


export const Order = model('Order',orderSchema);

