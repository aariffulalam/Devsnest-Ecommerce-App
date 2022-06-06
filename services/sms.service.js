const { twilio } = require('../config');
const client = require('twilio')(twilio.apiSID, twilio.apiToken);
const { generateOtp } = require('./user.service')
exports.sendSMS = async (body, to) => {
    await client.messages
        .create({
            body: generateOtp,
            from: twilio.from,
            to
        })
        .then(message => console.log(message.sid));
}