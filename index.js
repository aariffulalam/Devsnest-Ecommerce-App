const express = require("express");
require('dotenv').config()

const app = express()

const port = process.env.PORT || 8000
console.log(port)


// app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/auth', require('./routes/auth.route'))
app.use('/sellers', require('./routes/seller.route'))
app.use('/products', require('./routes/product.route'))

app.listen(port, () => {
    console.log(`i am listing at ${port} port`)
})