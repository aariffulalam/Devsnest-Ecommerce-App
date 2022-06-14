const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const md5 = require('md5');

const logger = require('../logger/index')

const createUser = async (userDetails) => {
    logger.info("user.service.js file")
    try{
        await prisma.user.create({
            data: {
                ...userDetails,
                password: md5(userDetails.password),
                role: 'USER'
            }
        })
        logger.info("user successfully signedUp")
    }
    catch(error){
        logger.error(error)
    }
    logger.info("user.service completed")
}

module.exports = {
    createUser
};