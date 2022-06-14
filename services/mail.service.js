const nodemailer = require('nodemailer');
require('dotenv').config();
const logger = require("../logger/index")

exports.sendmail = async (to, otp) => {
    logger.info("mail.service.js file")
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
        }
    });

    const mailDetails = {
        from: process.env.NODEMAILER_USER,
        to,
        subject: "OTP Verify Account",
        text: `Dear user  verify your email OTP ${otp} in Devsnest Ecommerce Application. `
    }


    transport.sendMail(mailDetails, (err, res) => {
        if (err) {
            logger.error(err.message)
        } else {
            logger.info("otp shared to mail")
        }
    })
    logger.info("mail.service.js completed")
}   