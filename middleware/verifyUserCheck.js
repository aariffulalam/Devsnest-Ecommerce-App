const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

exports.verifyUserCheck = async (req, res, next) => {
    const { email, otp } = req.body
    try {
        if (typeof email !== "string" || typeof otp !== "string") {
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
            return res.status(400).json({
                title: "error",
                message: "user already verified."
            })
        }
        next()
    }
    catch (error) {
        // console.log(error.message)
        res.status(500).json({
            title: " error",
            message: error.message
        });
    }
}