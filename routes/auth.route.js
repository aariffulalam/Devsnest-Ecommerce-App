const router = require('express').Router();

const { verifyToken } = require('../middleware/auth')

const { signup, login, logout, verify } = require('../controller/auth.controller')

const { initialUserCheck } = require('../middleware/initialUserCheck')
const { userExist } = require('../middleware/userExist')
const { verifyUserCheck } = require('../middleware/verifyUserCheck')




// User SignUP
router.post('/signup', initialUserCheck, userExist, signup)

// Verify
router.get('/verify', verifyUserCheck, verify)

// User LogIn
router.get('/login', login)

// User Logout
router.get('/logout', verifyToken, logout)


module.exports = router;