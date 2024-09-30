import Stripe from 'stripe';
import { STRIPE_API_VERSION, STRIPE_SECRET_KEY } from './payment.constant';
import { Booking } from '../bookings/bookings.model';
import { Service } from '../service/service.model';
import { initiatePayment } from './payment.utils';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: STRIPE_API_VERSION,
});

const createPaymentLink = async (userId: string) => {
  const bookings = await Booking.find({ userId });
  const productIds = bookings.map((item) => item.serviceId);
  const service = await Service.find({ _id: { $in: productIds } }).exec();
  if (!bookings || bookings.length === 0) {
    throw new Error('No bookings found for the user.');
  }

  const lineItems = bookings.map((booking) => {
    const productD = service.find(
      (product) => product._id.toString() === booking.serviceId.toString(),
    );
    const title = productD?.title || '';
    const price = Number(productD?.price) || 0;

    const image = productD?.image[0] || '';

    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: title,
          images: image ? [image] : [],
        },
        unit_amount: Math.round(price * 100), // Convert to cents
      },
      quantity: 1, // Assuming each booking is a single unit
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'https://mechanical-keyboard-shop-ten.vercel.app/success',
    cancel_url: 'https://mechanical-keyboard-shop-ten.vercel.app/error',
  });

  return session;
};

const amrPayPayment = async (data: {
  totalPrice: number;
  totalHoursInDecimal: number;
}) => {
  const result = await initiatePayment(data);

  return result;
};

export const createPaymentLinkService = {
  createPaymentLink,
  amrPayPayment,
};
