const router = require('express').Router();

const { verifyToken } = require('../middleware/auth')

const { signup, login, logout, verify } = require('../controller/auth.controller')

const { initialUserCheck } = require('../middleware/initialUserCheck')
const { userExist } = require('../middleware/userExist')
const { verifyUserCheck } = require('../middleware/verifyUserCheck')
const { initialLoginCheck } = require('../middleware/initialLoginCheck')




// User SignUP
router.post('/signup', initialUserCheck, userExist, signup)

// Verify
router.get('/verify', verifyUserCheck, verify)

// User LogIn
router.get('/login', initialLoginCheck, login)

// User Logout
router.get('/logout', verifyToken, logout)


module.exports = router;    // console.log("inside send mail")
// console.log(process.env.NODEMAILER_USER, process.env.NODEMAILER_PASSWORD)