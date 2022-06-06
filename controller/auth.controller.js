// const { prisma } = require('@prisma/client')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const md5 = require('md5');
const { generateToken } = require('../middleware/auth')

const { createUser } = require('../services/user.service')

exports.signup = async (req, res) => {
    const { name, phoneNumber, email, password, confirmPassword, role, token } = req.body
    if ((!(name && phoneNumber && email && password && confirmPassword && role))) {
        return res.status(400).json({ message: 'Insufficient Imformation' })
    }
    if (password != confirmPassword) {
        return res.status(400).json({ message: "Password don't match" })
    }

    try {
        await createUser({
            name,
            phoneNumber,
            email,
            password,
            role
        })
        res.status(201).json({ message: "User created successfully." })
    } catch (error) {
        res.status(500).json({ message: "Something Failed! " + error.message })
    }
}




exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    const hashedPassword = md5(password)
    console.log(hashedPassword)

    if (hashedPassword === user.password) {
        const token = generateToken(user.id)
        console.log(user.password);

        const updateToken = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                token
            }
        })
        res.cookie('authToken', token)
        res.status(200).json({ status: "Logedin successfully", updateToken })
    }
}

// exports.verification = async (req, res) => {
//     const { email, }
// }



exports.logout = async (req, res) => {
    res.clearCookie("authToken").send({ statusLogout: "success" })
}
