const { sendSMS } = require("../services/sms.service");

const createOtp = async (req, res) => {
    const otp = "123456";
    const someuser = "+917701941030";

    await sendSMS("Otp is " + otp, someuser);
    res.status(200).send({ message: "success" })
}

module.exports = {
    createOtp
}