const router = require('express').Router();
const { createOtp } = require("../controller/otp.controller")

router.post(createOtp)

// module.exports = router