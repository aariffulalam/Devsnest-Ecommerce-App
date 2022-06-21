const express = require("express");
require('dotenv').config();

const app = express();
const cors = require('cors');

const port = process.env.PORT || 8000
console.log(port)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use('/auth', require('./routes/auth.route'))
app.use('/sellers', require('./routes/seller.route'))
app.use('/products', require('./routes/product.route'))

// app.use('/user', require('./routes/user.route'))


app.listen(port, () => {
    console.log(`i am listing at ${port} port`)
})