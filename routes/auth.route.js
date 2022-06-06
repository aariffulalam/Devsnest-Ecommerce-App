const router = require('express').Router();

const { verifyToken } = require('../middleware/auth')

const { signup, login, logout } = require('../controller/auth.controller')

const { initialUserCheck } = require('../middleware/initialUserCheck')
const { userExist } = require('../middleware/userExist')




// User SignUP
router.post('/signup', initialUserCheck, userExist, signup)

// User LogIn
router.get('/login', login)

// User Logout
router.get('/logout', verifyToken, logout)


module.exports = router;