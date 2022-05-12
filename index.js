const express = require("express");

const app = express()

const port = process.env.PORT || 8000

const { productget, productgetbyid, getproductbysellerid, postproduct, updateproduct, editproduct, deleteproduct } = require("./controller/controller.product")
const { getsellers, getsellerbyid, postseller, updateseller, editseller } = require("./controller/controller.seller")


app.use(express.json())


// Get all Products
app.get('/products', productget)


// get product by id
app.get('/products/:id', productgetbyid)


// get products by sellerId
app.get('/products/seller/:sellerId', getproductbysellerid)


// Get all Sellers
app.get('/sellers', getsellers)


// Get seller by id
app.get('/seller/:id', getsellerbyid)


// every seller has multiple products 
// but it is not necessery that in seller table same type of seller will not exist.


// post seller
app.post('/seller', postseller)


// post product
app.post('/product/:sellerId', postproduct)


// update object seller
app.put('/seller/:id', updateseller)


// update object product
app.put('/product/:id', updateproduct)


// update data of prticular product
app.patch('/seller/:id', editseller)


// update date of perticular product
app.patch('/product/:id', editproduct)


// DELETE 
/*
    1 -> if you want to delete user
            if you are passing id of seller to "http delete method" then it will give error because seller is refferenced by product. so for to delete user first we need to delete all products of seller.

    2 -> product you can delete 
        what if i want to delete all products in one click
*/


// DELETE Product 
app.delete('/product/:id', deleteproduct)


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