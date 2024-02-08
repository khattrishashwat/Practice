const nodemailer= require('nodemailer')
const express= require('express')
const router=express.Router()
const Email =require("../Model/email");
const crypto = require('crypto');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
  });
//   const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };
  router.post('/email', async (req, res) => {
    try {
      const {Email} =req.body
    //   const otp = generateOTP();
  
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: Email,
        subject: "Your OTP",   
        // text: `Your OTP is: ${otp}`,
        text:process.env.FRONTEND_URL,
      };
  
        await transporter.sendMail(mailOptions);

      
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  module.exports = router;

   