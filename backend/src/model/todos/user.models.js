import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    user: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      unique: true,
      required: [true, "password must be entered"],
    },
  },
  { timestamps: true },
);

export const User = model("user", userSchema);
