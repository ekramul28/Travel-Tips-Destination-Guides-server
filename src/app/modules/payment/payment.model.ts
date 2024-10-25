import { model, Schema } from 'mongoose';
import { TPaymentDetails } from './payment.interface';

const PaymentDetailsSchema = new Schema<TPaymentDetails>(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payment_processor: {
      type: String,
      required: true,
    },
    bank_trxid: {
      type: String,
      required: true,
    },
    pg_txnid: {
      type: String,
      required: true,
    },
    mer_txnid: {
      type: String,
      required: true,
    },

    payment_type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
); // Optionally include timestamps

export const PaymentDetails = model<TPaymentDetails>(
  'PaymentDetails',
  PaymentDetailsSchema,
);
