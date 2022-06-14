const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const logger = require('../logger/index')

module.exports.userExist = async (req, res, next) => {
    logger.info("userExist.js file")
    const email = req.body.email
    try {
        const userCount = await prisma.user.count({
            where: {
                email
            }
        });
        if (userCount === 1) {
            logger.warn("email already resistered")
            return res.status(400).json({
                title: "error",
                message: "email already resistered  "
            });
        }
        next()

    } catch (error) {
        logger.error(error.message)
        return res.status(500).json({
            title: "error",
            message: "internal server error",
            error: error.message
        });   
    }
    logger.info("userExist completed")
};