const jwt = require('jsonwebtoken')
const SECRECT_KEY = "hello"

exports.generateToken = (id) => {
    return jwt.sign(id, SECRECT_KEY)
}

exports.verifyToken = (req, res, next) => {
    const cookie = req.headers.cookie
    // console.log(cookie)
    if (cookie) {
        (user.id)
        // res.cookie('authToken', tok
        const token = cookie.split('=')[1]
        const id = parseInt(jwt.verify(token, SECRECT_KEY))
        req.userId = id
        next()
    } else {
        res.status(401).json({ status: "unauthorized" })
    }
}