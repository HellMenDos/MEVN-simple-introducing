const nodemailer = require('nodemailer'); 
module.exports =  transporter = nodemailer.createTransport({
             // true for 465, false for other ports
host: "smtp.gmail.com",
port: 587,
ignoreTLS: false,
secure: false,
   auth: {
        user: 'poznkirill4@gmail.com',
        pass: 'Kirill3399',
     }
});
