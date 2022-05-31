const router = require('express').Router();

const { verifyToken } = require('../middleware/auth')

const { signup, login, logout } = require('../controller/auth.controller')




// User SignUP
router.post('/signup', signup)

// User LogIn
router.get('/login', login)

// User Logout
router.get('/logout', verifyToken, logout)


module.exports = router;