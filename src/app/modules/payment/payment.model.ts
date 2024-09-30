import mongoose, { Schema } from "mongoose";
import { ICart } from "./payment.interface";

const CartSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  productQuantity: { type: Number, required: true },
  email: { type: String, required: true },
});

export const PaymentCart = mongoose.model<ICart>("PaymentCart", CartSchema);
