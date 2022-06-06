const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const md5 = require('md5');
const optGenerator = require("otp-generator");

const createUser = async (userDetails) => {

    await prisma.user.create({
        data: {
            ...userDetails,
            password: md5(userDetails.password),
            role: 'USER'
        }
    })
}

module.exports = {
    createUser
};