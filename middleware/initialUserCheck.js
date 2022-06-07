const { isValidEmail } = require('../validation/email.validation')
const { isValidPassword } = require('../validation/password.validation')

module.exports.initialUserCheck = (req, res, next) => {
    // console.log("i am intialUserCheck file 1")
    const { name, email, password } = req.body

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return res.status(400).json({
            title: "error",
            message: "name, email, password id required."
        })
    }

    if (!(isValidEmail(email))) {
        return res.status(400).json({
            title: "error",
            message: "invalid email."
        })
    }

    if (!(isValidPassword(password))) {
        return res.status(400).json({
            title: "error",
            message: "invalid password"
        })
    }
    next()
}