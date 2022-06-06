const optGenerator = require("otp-generator");
exports.generateOtp = optGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false
})
console.log(generateOtp)