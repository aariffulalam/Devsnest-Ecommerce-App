const router = require('express').Router();

const { products, productgetbyid, getproductbysellerid, postproduct, updateproduct, editproduct, deleteproduct } = require('../controller/product.controller')

router.get('/products', products)

router.get('/product/:id', productgetbyid)

router.get('/products/seller/:id', getproductbysellerid)

router.post('/product', postproduct)

router.put('/product/:id', updateproduct)

router.patch('/produt/:id', editproduct)

router.delete('/product/:id', deleteproduct)

module.exports = router