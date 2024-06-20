import { Schema, model } from "mongoose";

const sub_todoSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Sub_Todo = model("Sub_Todo", sub_todoSchema);
