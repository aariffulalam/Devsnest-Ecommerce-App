// const { prisma } = require('@prisma/client')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const md5 = require('md5');
const { generateToken } = require('../middleware/auth')


const { createUser } = require('../services/user.service')

const { generateOtp } = require('../services/otp.service')
// console.log(generateOtp, 1)
const { sendSMS } = require('../services/sms.service')
const { sendmail } = require('../services/mail.service')

const logger = require('../logger/index')

exports.signup = async (req, res) => {
    logger.info("auth.controller.js file")
    logger.info("signup")
    const { name, phoneNumber, email, password, confirmPassword, role } = req.body
    if ((!(name && phoneNumber && email && password && confirmPassword && role))) {
        logger.warn("Insufficient Imformation")
        return res.status(400).json({ message: 'Insufficient Imformation' })
    }
    if (password != confirmPassword) {
        logger.warn("Password don't match")
        return res.status(400).json({ message: "Password don't match" })
    }

    try {
        await createUser({
            name,
            phoneNumber,
            email,
            password,
            otp: generateOtp,
            role
        })
        // console.log("i am working 2")
        logger.info("OTP sending")
        await sendSMS(generateOtp, phoneNumber)
        await sendmail(email, generateOtp)
        logger.info("OTP shared successfully")
        logger.info("User created successfully")
        res.status(201).json({ message: "User created successfully." })
        logger.info("signUp part completed")
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({
            message: "Something Failed! " + error.message, data: {
                otp: generateOtp
            }
        })
    }
}

exports.verify = async (req, res) => {
    logger.info("auth.controller.js file")
    logger.info("verify")
    const { email, otp } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        // console.log(user.id)
        if (user.otp !== otp) {
            logger.warn("otp did not match")
            return res.status(500).json({
                title: "error",
                message: "otp did not match."
            });
        }

        await prisma.user.update({
            where: {
                id: parseInt(user.id)
            },
            data: {
                verified: true
            }
        })
        logger.info(`email ${email} verified`)
        res.status(201).json({
            title: "verified",
            message: `email ${email} verified`,
            data: user
        })
        logger.info("verify part completed")
    }
    catch (err) {
        logger.error(error.message)
        // console.log(err.message)
        res.status(500).json({ title: "internal server error" })
    }
}

exports.login = async (req, res) => {
    logger.info("auth.controller.js file")
    logger.info("logIn")
    const { email, password } = req.body
    try {

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        const hashedPassword = md5(password)
        if (hashedPassword === user.password) {
            const token = generateToken(user.id)
            const updateToken = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    token
                }
            })
            logger.info("Login successfully")
            res.cookie('authToken', token)
            res.status(200).json({ status: "Logedin successfully", updateToken })
        } else {
            logger.warn("password is wrong")
            res.status(400).json({
                title: "error",
                message: "password is wrong."
            })
        }
        logger.info("login part completed")
    }
    catch (error) {
        logger.error(error.message)
        res.status(500).json({
            title: "error",
            message: [error.message]
        })
    }
}


exports.logout = async (req, res) => {
    res.clearCookie("authToken").send({ statusLogout: "success" })
}
