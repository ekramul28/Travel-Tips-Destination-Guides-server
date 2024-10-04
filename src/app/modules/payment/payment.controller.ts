import httpStatus from 'http-status';
import { createPaymentLinkService } from './payment.service';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const stripePayment = catchAsync(async (req, res) => {
  const { id } = req.body;
  const result = await createPaymentLinkService.createPaymentLink(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'link ',
    data: result,
  });
});
const amrPayPayment = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await createPaymentLinkService.amrPayPayment(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'payment link get successfully ',
    data: result,
  });
});

export const LinkControllers = {
  stripePayment,
  amrPayPayment,
};
