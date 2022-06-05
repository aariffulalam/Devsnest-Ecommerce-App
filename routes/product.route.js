const router = require('express').Router();

const { products, productgetbyid, getproductbysellerid, postproduct, updateproduct, editproduct, deleteproduct } = require('../controller/product.controller')

router.get('/', products)

router.get('/:id', productgetbyid)

router.get('/seller/:sellerId', getproductbysellerid)

router.post('/', postproduct)

router.put('/:id', updateproduct)

router.patch('/:id', editproduct)

router.delete('/:id', deleteproduct)

module.exports = router