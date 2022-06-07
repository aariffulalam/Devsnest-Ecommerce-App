const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const { isValidEmail } = require("../validation/email.validation");

exports.initialLoginCheck = async (req, res, next) => {
    const { email, password } = req.body;
    // console.log("hello i am working.")

    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({
            title: "error",
            message: "Type of email and otp is not valid."
        })
    }
    // console.log(isValidEmail(email))
    if (!(isValidEmail(email))) {
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
    // console.log(user.verified === false)
    if (user.verified === false) {
        return res.status(400).json({
            title: "error",
            message: "user is not  verified."
        })
    }
    next()
}