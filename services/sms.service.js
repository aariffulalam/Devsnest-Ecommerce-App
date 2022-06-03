const { twilio } = require('../config');
const client = require('twilio')(twilio.apiSID, twilio.apiToken);

exports.sendSMS = async (body, to) => {
    await client.messages
        .create({
            body,
            from: twilio.from,
            to
        })
        .then(message => console.log(message.sid));
}