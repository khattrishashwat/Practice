const nodemailer= require('nodemailer')
// const router = require('./user')

const express= require('express')
const router=express.Router()

let transporter = nodemailer.createTransport({
    service: 'Gmail' ,
    secure: true,
    auth: {
        user: 'tariyaadmay@gmail.com',
        pass: 'ltht awfp gzli rvuq'
    } 
})

let createOtp= ()=>{
    let otp= Math.floor(Math.random()*5000)
    return otp
}

//obj to store otp
let otps={}

router.post('/sendotp',(req,res)=>{
    const {email}= req.body
    const otp = createOtp()

    otps[email]= email
    otps={email: email,otp: otp}
    console.log(otps);
    const mailOptions = {
        from: 'kushagra.singh.webmobril@gmail.com',
        to: email,
        subject: 'test email',
        text: 'this is a test email',
        // html: `<a href="www.google.com">click here</a>`
        html: `<p>Your otp is: <strong>${otp}</strong></p>`
    }

    transporter.sendMail(mailOptions, (error,info)=>{
        if(error){
            res.status(400).send('error occured while sending email: ',error);
        }
        res.status(200).send('message sent: %s', info.messageId);
    })
})

// router.post('/verifyOTP', (req,res)=>{
//     const {email,otp}= req.body
//     console.log(otps)
//     if(email && otps[email]===otp){
      
//         res.send("OTP verified")
//     }
//     else{
//         res.send('Invalid otp') 
//     }
// })

module.exports= router
        
        