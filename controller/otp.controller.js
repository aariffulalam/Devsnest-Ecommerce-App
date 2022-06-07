const { sendSMS } = require("../services/sms.service");
const { generateOtp } = require('../services/otp.service')
const { signup } = require('./auth.controller')


const createOtp = async (req, res) => {
    const otp = generateOtp;
    const someuser = "+917701941030";

    await sendSMS("Otp is " + otp, someuser);
    res.status(200).send({ message: "success" })
}

module.exports = {
    createOtp
}