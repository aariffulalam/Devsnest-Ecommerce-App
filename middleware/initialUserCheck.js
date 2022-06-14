const { isValidEmail } = require('../validation/email.validation');
const { isValidPassword } = require('../validation/password.validation');

const logger = require('../logger/index')

module.exports.initialUserCheck = (req, res, next) => {
    logger.info("initialUserCheck.js file")
    
    const { name, email, password } = req.body

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        logger.warn("name, email, password id required.")
        return res.status(400).json({
            title: "error",
            message: "name, email, password id required."
        })
    }

    if (!(isValidEmail(email))) {
        logger.warn("invalid email.")
        return res.status(400).json({
            title: "error",
            message: "invalid email."
        })
    }

    if (!(isValidPassword(password))) {
        logger.warn("invalid password")
        return res.status(400).json({
            title: "error",
            message: "invalid password"
        })
    }
    logger.info("initialUserCheck completed.")
    next()
}