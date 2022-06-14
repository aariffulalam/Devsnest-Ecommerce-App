const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const { isValidEmail } = require("../validation/email.validation");

const logger = require('../logger/index')

exports.initialLoginCheck = async (req, res, next) => {
    logger.info("initilLoginCheck.js file")
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
        logger.warn("Type of email and otp is not valid")
        return res.status(400).json({
            title: "error",
            message: "Type of email and otp is not valid."
        })
    }
    // console.log(isValidEmail(email))
    if (!(isValidEmail(email))) {
        logger.warn("invalid email")
        return res.status(400).json({
            title: "error",
            message: "invalid email."
        })
    }

    // user resiter or not
    const userCount = await prisma.user.count({
        where: {
            email
        }
    })
    // console.log(userCount)
    if (userCount === 0) {
        logger.warn("user not exist")
        return res.status(400).json({
            title: "error",
            message: "user not exist."
        })
    }

    // user verified already or not 
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (user.verified === false) {
        logger.warn("user is not verified")
        return res.status(400).json({
            title: "error",
            message: "user is not  verified."
        })
    }
    logger.info("initialLoginCheck completed")
    next()
}