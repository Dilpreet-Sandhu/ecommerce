import asyncHandler from "../utils/asyncHanlder.js";
import {ApiResponse} from '../utils/apiResponse.js'
import { ApiError } from "../utils/apiError.js";
import { Cart } from "../model/ecommerce/cart.model.js";
import { Order } from "../model/ecommerce/order.model.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const { shippingAdress, paymentMethod } = req.body;
  const userId = req.user?._id;

  const cart = await Cart.findOne({userId}).populate("items.productId","title image price")


  if (!cart || cart.items.length < 0) {
    throw new ApiError(400, "cart is empty");
  }
 

  const products = cart.items.map((item) => ({
    productId: item.productId,
    productsCount: item.productCount,
    productPrice: item.productId.price,
    title: item.productId.title,
    image : item.productId.image
  }));

  const order = await Order.create({
    userId,
    products,
    totalPrice: cart.totalPrice,
    taxPercentage: cart.taxPercentage,
    shippingPrice: cart.shippingPrice,
    shippingAdress : shippingAdress,
    paymentMethod : paymentMethod,
    deliveredAt: new Date(),
    state : "PENDING"
  });

  if (!order) {
    throw new ApiError(400,"no order found")
  }


  res.status(200).json(
    new ApiResponse(200,order,"order placed successfully")
  );
});


