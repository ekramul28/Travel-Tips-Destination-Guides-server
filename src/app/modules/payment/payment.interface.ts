import mongoose from 'mongoose';

interface IProduct {
  title: string;
  price: number;
  // other fields as needed
}

export interface ICart {
  product: IProduct | mongoose.Types.ObjectId;
  productQuantity: number;
  email: string;
  // other fields as needed
}
