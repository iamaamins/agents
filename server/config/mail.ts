import 'server-only';

import nodemailer from 'nodemailer';
import { EmailOptions } from '@/types';

const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_EMAIL_PASSWORD,
  },
});

export async function sendEmail(options: EmailOptions) {
  try {
    await transporter.sendMail(options);
  } catch (err) {
    throw err;
  }
}
