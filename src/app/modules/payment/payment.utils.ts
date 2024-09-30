import { v4 as uuidv4 } from 'uuid'; // Install uuid package for unique IDs
import config from '../../config';

export const initiatePayment = async (paymentData: {
  totalPrice: number;
  totalHoursInDecimal: number;
}) => {
  try {
    const tranId = `tran_${uuidv4()}`;
    const amount = paymentData?.totalPrice.toString();
    const totalTime = paymentData?.totalHoursInDecimal.toString();
    const data = {
      store_id: config.amr_pay_id,
      signature_key: config.amr_pay_key,
      tran_id: tranId,
      success_url: 'http://www.merchantdomain.com/successpage.html',
      fail_url: 'http://www.merchantdomain.com/failedpage.html',
      cancel_url: 'http://www.merchantdomain.com/cancelpage.html',
      amount: amount,
      totalTime,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: 'Name',
      cus_email: 'payer@merchantcustomer.com',
      cus_add1: 'House B-158 Road 22',
      cus_add2: 'Mohakhali DOHS',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1206',
      cus_country: 'Bangladesh',
      cus_phone: '+8801704',
      type: 'json',
      ...paymentData, // Override or add additional fields from paymentData
    };

    const response = await fetch('https://sandbox.aamarpay.com/jsonpost.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error('Payment initiation failed:', err);
    throw new Error('Payment initiation failed!');
  }
};
