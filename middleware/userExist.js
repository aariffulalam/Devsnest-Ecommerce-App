const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.userExist = async (req, res, next) => {
    const email = req.body.email
    try {
        const userCount = await prisma.user.count({
            where: {
                email
            }
        });
        if (userCount === 1) {
            return res.status(400).json({
                title: "error",
                message: "email already resistered  "
            });
        }

    } catch (error) {
        return res.status(500).json({
            title: "error",
            message: "internal server error",
            error: error.message
        });
    }
};