import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      rate: {
        type: Number,
      },
      count: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
