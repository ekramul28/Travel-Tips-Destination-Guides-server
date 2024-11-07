import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  console.log('user', config.sender_email, 'pass', config.sender_app_password);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'mdekramulhassan168@gmail.com',
      pass: 'tffp gopv flal wlaj',
    },
  });

  await transporter.sendMail({
    from: config.sender_email, // sender address
    to: to, // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
