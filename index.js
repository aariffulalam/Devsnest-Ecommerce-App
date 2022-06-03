const express = require("express");
require('dotenv').config();

const app = express();
const cors = require('cors');

const port = process.env.PORT || 8000
// console.log(port)

const { createOtp } = require("./controller/otp.controller")



// app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())


app.use('/auth', require('./routes/auth.route'))
app.use('/sellers', require('./routes/seller.route'))
app.use('/products', require('./routes/product.route'))

// app.use('/otp', require('./routes/otp.route'))
app.use('/otp', createOtp)


app.listen(port, () => {
    console.log(`i am listing at ${port} port`)
})