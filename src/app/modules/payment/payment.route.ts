import express from 'express';
import { LinkControllers } from './payment.controller';
const router = express.Router();

router.post('/Create-checkout-session', LinkControllers.stripePayment);
router.post('/amrPay', LinkControllers.amrPayPayment);

export const PaymentRoutes = router;
