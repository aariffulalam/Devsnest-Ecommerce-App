const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendmail = async (to, otp) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
        }
    });
    // console.log(to, otp)
    // console.log(process.env.NODEMAILER_USER, process.env.NODEMAILER_PASSWORD)
    const mailDetails = {
        from: process.env.NODEMAILER_USER,
        to,
        subject: "OTP Verify Account",
        text: `Dear user  verify your email OTP ${otp} in Devsnest Ecommerce Application. `
    }
    // console.log("inside send mail")
    // console.log(process.env.NODEMAILER_USER, process.env.NODEMAILER_PASSWORD)

    transport.sendMail(mailDetails, (err, res) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log("otp shared to mail")
        }
    })
}   