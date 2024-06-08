import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';

export const sendEmail = async({email,emailType,userId}:any) => {
    try{

      const hashedToken = uuidv4();

      if(emailType==="VERIFY"){
        await User.findByIdAndUpdate(userId,{$set:{verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 3600000}})
      }
      else if (emailType==="RESET"){
        await User.findByIdAndUpdate(userId,{$set:{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000}})
      }


      const transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.USER,
          pass: process.env.APP_PASSWORD,
        },
      });
          const mailOptions = {
            from: process.env.USER, // sender address
            to: email, // list of receivers
            subject: emailType==='VERIFY'?"Verify your emailId":"Rest your password", // Subject line
            text: "Hello world?", // plain text body
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY"?"verify your email":"reset your password"} or copy and paste the link below in your browser.
            <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
          }
         const mailResponse =  await transporter.sendMail(mailOptions);
         console.log(mailResponse);
         return mailResponse;
    }catch(error:any){
        console.log({"error":error})
    }
}