const { twilio } = require('../config');

const logger = require('../logger/index')

const client = require('twilio')(twilio.apiSID, twilio.apiToken);
function sendSMS(body, to) {
    logger.info("sms.service.js file")
    client.messages
        .create({
            body,
            from: twilio.from,
            to
        })
        .then(message => console.log("sms.service file",message.sid));
        logger.info("sms.service.js completed")
}
module.exports = {
    sendSMS
}