const nodemailer=require('nodemailer');

const sendEmail=async(option)=>{
   
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailoption={
        from:process.env.SMTP_MAIL,
        to:option.email,
        subject:option.subject,
        text:option.message
    }

    await transporter.sendMail(mailoption);
        
}

module.exports=sendEmail;