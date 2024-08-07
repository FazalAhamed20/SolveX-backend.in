import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendOTP = async (email: string, otp: number | string) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    service: 'Gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
    secure: true,
  });

  const message = 'Enter this OTP to continue';
  const mailData = {
    from: 'mydocctor@gmail.com',
    to: email,
    subject: 'OTP from SolveX',
    html: `<p>${message}</p> <p style='color: red; font-size: 25px; letter-spacing: 2px'><b>${otp}</b></p>`,
  };

  transporter.sendMail(mailData, (error) => {
    return new Promise((resolve, reject) => {
      if (error) {
        console.log('Error occured while sending the OTP', error);
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
