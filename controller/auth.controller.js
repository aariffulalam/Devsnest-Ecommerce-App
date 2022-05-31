const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const bcrypt = require('bcrypt');
const salt = 10

const { generateToken } = require('../middleware/auth')


exports.signup = async (req, res) => {
    const { name, phoneNumber, email, password, role } = req.body
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: {
            name,
            phoneNumber,
            email,
            password: hashedPassword,
            role
        }
    })
    // const token = generateToken(user.id)
    // res.cookie('authToken', token)
    res.status(201).json({ status: "You are SignUp successfully", user })
}


exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    const isPasswordMatched = bcrypt.compare(password, user.password);
    if (isPasswordMatched) {
        const token = generateToken(user.id)
        res.cookie('authToken', token)
        res.status(200).json({ status: "Logedin successfully", user })
    }
}


exports.logout = async (req, res) => {
    res.clearCookie("authToken").send({ statusLogout: "success" })
}






























































































exports.getuser = async (req, res) => {
    const getUser = await prisma.user.findMany()
    res.send(getUser)
}

exports.getuserbyid = async (req, res) => {
    const { id } = req.params
    const getUserById = await prisma.user.findFirst({
        where: {
            id: parseInt(id)
        }
    })
    res.send(getUserById)
}

exports.postuser = async (req, res) => {
    const { name, phoneNumber, email, password, role } = req.body;
    const postUser = await prisma.user.create({
        data: {
            name,
            phoneNumber,
            email,
            password,
            role
        }

    })
    res.send(postUser)
}

exports.updateuser = async (req, res) => {
    const { id } = req.params
    const data = req.body;
    console.log(id, data)
    const updateUser = await prisma.user.updateMany({
        where: {
            id: parseInt(id)
        },
        data
    })
    res.send(updateUser)
}

exports.edituser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log(id, data)
    const editUser = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data
    })
    res.send(editUser)
}

exports.deleteuser = async (req, res) => {
    const { id } = req.params
    const deleteUser = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    })
    res.send(deleteUser)
}