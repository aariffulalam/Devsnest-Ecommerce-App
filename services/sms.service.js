const { twilio } = require('../config');
// const { generateOtp } = require('./user.service')
const client = require('twilio')(twilio.apiSID, twilio.apiToken);
function sendSMS(body, to) {
    console.log("SendSMS function")
    client.messages
        .create({
            body,
            from: twilio.from,
            to
        })
        .then(message => console.log(message.sid));
}
module.exports = {
    sendSMS
}