/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import config from '../../config';
import { TUser } from '../User/user.interface';

export const initiatePayment = async (data: {
  totalPrice: number;
  user: TUser;
}) => {
  const { totalPrice, user } = data;
  console.log(totalPrice);
  try {
    const tranId = `tran_${uuidv4()}`;
    const amount = totalPrice?.toFixed(2);

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      throw new Error('Invalid total price provided for payment.');
    }

    // Prepare the payment data
    const data = {
      store_id: config.amr_pay_id,
      signature_key: config.amr_pay_key,
      tran_id: tranId,
      success_url: `http://localhost:5000/api/v1/payment/conformation?userId=${user._id}&tnxId=${tranId}`,
      fail_url: 'http://localhost:5000/api/v1/payment/fail',
      cancel_url: config.cancel_url,
      amount: amount,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: user.name,
      cus_email: user.email,
      cus_add1: 'House B-158 Road 22',
      cus_add2: 'Mohakhali DOHS',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1206',
      cus_country: 'Bangladesh',
      cus_phone: user.mobileNumber,
      type: 'json',
    };

    // Adding a timeout mechanism
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    const response = await fetch('https://sandbox.aamarpay.com/jsonpost.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    clearTimeout(timeout); // Clear the timeout if fetch completes

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`,
      );
    }

    const result = await response.json();
    return result;
  } catch (err: any) {
    console.log(err.message);
    throw new Error('Payment initiation failed!');
  }
};

export const VerifyPayment = async (tnxId: string) => {
  const queryParams = new URLSearchParams({
    store_id: config.amr_pay_id || '',
    signature_key: config.amr_pay_key || '',
    type: 'json',
    request_id: tnxId,
  }).toString();

  const url = `${config.amr_pay_verify_url}?${queryParams}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    // Log the raw response text for debugging
    const responseText = await response.text();
    console.log('Raw response text:', responseText);

    // Try parsing if the response is in JSON format
    const result = JSON.parse(responseText);

    if (!result || typeof result !== 'object') {
      throw new Error('Unexpected response format');
    }

    return result;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};
