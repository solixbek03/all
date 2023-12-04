import { createTransport } from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()

let transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL, // generated ethereal user
    pass: process.env.GMAIL_PASSWORD, // generated ethereal password
  },
});


const mailer = async (message:object) => {
  transporter.sendMail(message, (err, info) => {
    if(err) return console.log(err.message);
    console.log(info);
  });
}

export default mailer;