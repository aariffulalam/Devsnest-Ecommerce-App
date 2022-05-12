const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()
const app = express()

const port = 8000


app.use(express.json())


// Get all Products
app.get('/products', async (req, res) => {
    const data = await prisma.product.findMany()
    res.send(data)
})


// get product by id
app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    const productGetById = await prisma.product.findMany({
        where: {
            id: parseInt(id)
        }
    })
    res.json(productGetById)
})


// get products by sellerId
app.get('/products/seller/:sellerId', async (req, res) => {
    const { sellerId } = req.params
    const productGetBySellerId = await prisma.product.findMany({
        where: {
            sellerId: parseInt(sellerId)
        }
    })
    if (productGetBySellerId.length > 0) {
        res.json(productGetBySellerId)
    }
    else {
        res.send(`This id -> ${sellerId} Seller has not any products . `)
    }
})


// Get all Sellers
app.get('/sellers', async (req, res) => {
    const data = await prisma.seller.findMany({ include: { products: true } })
    res.send(data)
})


// Get seller by id
app.get('/seller/:id', async (req, res) => {
    const { id } = req.params
    const sellerById = await prisma.seller.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    // console.log(sellerById)
    if (sellerById != null) {
        res.send(sellerById)
    }
    else {
        res.send('Seller is not exist in my database')
    }
})


// every seller has multiple products 
// but it is not necessery that in seller table same type of seller will not exist.


// post seller
app.post('/seller', async (req, res) => {
    try {
        const { name, email, gstNumber, phoneNumber } = req.body
        const postProduct = await prisma.seller.create(
            {
                data: {
                    name,
                    email,
                    gstNumber,
                    phoneNumber
                }
            }
        )
        res.json(postProduct)
    } catch (err) {
        console.log(err.message)
    }
})


// post product
app.post('/product/:sellerId', async (req, res) => {
    const { sellerId } = req.params
    try {
        const { name, price, description, productImages, isDiscounted, discountPrice, category, inStock } = req.body
        const postProduct = await prisma.product.create(
            {
                data: {
                    name,
                    price,
                    description,
                    productImages,
                    isDiscounted,
                    discountPrice,
                    category,
                    inStock,
                    sellerId: parseInt(sellerId)
                }
            }
        )
        res.json(postProduct)
    } catch (err) {
        res.send(`this Seller id is not exist. ${err.message} `)
    }
})


// update object seller
app.put('/seller/:id', async (req, res) => {
    const { id } = await req.params
    const { data } = await req.body
    console.log(data)
    const updateSellerData = await prisma.seller.updateMany({
        where: {
            id: parseInt(id)
        },
        data: data
    })
    res.json(updateSellerData)
})


// update object product
app.put('/product/:id', async (req, res) => {
    const { id } = await req.params
    const data = req.body
    console.log(id, data)
    const updateProduct = await prisma.product.updateMany({
        where: {
            id: parseInt(id)
        },
        data
    })
    res.json(updateProduct)
})


// update data of prticular product
app.patch('/seller/:id', async (req, res) => {
    const { id } = req.params
    const updateSellerData = await prisma.seller.update({
        where: {
            id: parseInt(id)
        },
        data: await req.body
    })
    res.send(updateSellerData)
})


// update date of perticular product
app.patch('/product/:id', async (req, res) => {
    const { id } = req.params
    const data = req.body
    const updateProductData = await prisma.product.update({
        where: {
            id: parseInt(id)
        },
        data
    })
    res.send(updateProductData)
})


// DELETE 
/*
    1 -> if you want to delete user
            if you are passing id of seller to "http delete method" then it will give error because seller is refferenced by product. so for to delete user first we need to delete all products of seller.

    2 -> product you can delete 
        what if i want to delete all products in one click
*/


// DELETE Product 
app.delete('/product/:id', async (req, res) => {
    const { id } = req.params
    const deleteProduct = await prisma.product.delete({
        where: {
            id: parseInt(id)
        }
    })
    res.send(deleteProduct)
})


// app.delete('/product', async (req, res) => {
//     const deleteProduct = await prisma.product.delete({

//         // i don't know it will be or not but using of loop i can do. if there is any other thing then you have to search Aarif
//         //    #   Doubt   #

//     })
//     res.send(deleteProduct)
// })



// DELETE seller 







app.listen(port, () => {
    console.log(`i am listing at ${port} port`)
})