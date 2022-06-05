// const { PrismaClient } = require('@prisma/client')

// const prisma = new PrismaClient()

// const bcrypt = require('bcrypt');
// const salt = 10

// const { generateToken } = require('../middleware/auth')
//**** 
const { createUser } = require('../services/user.service')
//****


exports.signup = async (req, res) => {
    const { name, phoneNumber, email, password, confirmPassword, role } = req.body
    // console.log(name, phoneNumber, email, password, confirmPassword, role)

    // ******
    if ((!(name && phoneNumber && email && password && confirmPassword && role))) {
        res.status(400).json({ message: 'Insufficient Imformation' })
    }
    if (password != confirmPassword) {
        res.status(400).json({ message: "Password don't match" })
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
//******


//     const hashedPassword = await bcrypt.hash(password, salt)

//     const user = await prisma.user.create({
//         data: {
//             name,
//             phoneNumber,
//             email,
//             password: hashedPassword,
//             role
//         }
//     })
//     // const token = generateToken(user.id)
//     // res.cookie('authToken', token)
//     res.status(201).json({ status: "You are SignUp successfully", user })
// }


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




















// exports.getuser = async (req, res) => {
//     const getUser = await prisma.user.findMany()
//     res.send(getUser)
// }

// exports.getuserbyid = async (req, res) => {
//     const { id } = req.params
//     const getUserById = await prisma.user.findFirst({
//         where: {
//             id: parseInt(id)
//         }
//     })
//     res.send(getUserById)
// }

// exports.postuser = async (req, res) => {
//     const { name, phoneNumber, email, password, role } = req.body;
//     const postUser = await prisma.user.create({
//         data: {
//             name,
//             phoneNumber,
//             email,
//             password,
//             role
//         }

//     })
//     res.send(postUser)
// }

// exports.updateuser = async (req, res) => {
//     const { id } = req.params
//     const data = req.body;
//     console.log(id, data)
//     const updateUser = await prisma.user.updateMany({
//         where: {
//             id: parseInt(id)
//         },
//         data
//     })
//     res.send(updateUser)
// }

// exports.edituser = async (req, res) => {
//     const { id } = req.params;
//     const data = req.body;
//     console.log(id, data)
//     const editUser = await prisma.user.update({
//         where: {
//             id: parseInt(id)
//         },
//         data
//     })
//     res.send(editUser)
// }

// exports.deleteuser = async (req, res) => {
//     const { id } = req.params
//     const deleteUser = await prisma.user.delete({
//         where: {
//             id: parseInt(id)
//         }
//     })
//     res.send(deleteUser)
// }