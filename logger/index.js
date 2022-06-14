const devLogger = require('../logger/devLogger');
const prodLogger = require('../logger/prodLogger');
require("dotenv").config();

let log = null;
console.log(process.env.NODE)
if (process.env.NODE ==="development"){
    log = devLogger
}
else{
    log = prodLogger
}
module.exports = log;