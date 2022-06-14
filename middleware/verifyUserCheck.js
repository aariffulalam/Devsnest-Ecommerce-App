const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const logger = require("../logger/index")

exports.verifyUserCheck = async (req, res, next) => {
    logger.info("verifyUserCheck.js file")
    const { email, otp } = req.body
    try {
        if (typeof email !== "string" || typeof otp !== "string") {
            logger.wanr("Type of email and otp is not valid.")
            return res.status(400).json({
                title: "error",
                message: "Type of email and otp is not valid."
            })
        }

        // user resiter or not
        const userCount = await prisma.user.count({
            where: {
                email
            }
        })

        if (userCount === 0) {
            logger.warn("user not exist.")
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
        if (user.verified === true) {
            logger.warn("user already verified")
            return res.status(400).json({
                title: "error",
                message: "user already verified."
            })
        }
        next()
    }
    catch (error) {
        logger.error(error.message)
        res.status(500).json({
            title: " error",
            message: error.message
        });
    }
    logger.info("verifyUserCheck completed")
}