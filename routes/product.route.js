const router = require('express').Router();
const {upload} = require('../middleware/productImage')

const { products, productgetbyid, getproductbysellerid, postproduct, updateproduct, editproduct, deleteproduct } = require('../controller/product.controller')

router.get('/', products)

router.get('/:id', productgetbyid)

router.get('/seller/:sellerId', getproductbysellerid)

router.post('/:id', upload.array("photos") ,postproduct)

router.put('/:id', updateproduct)

router.patch('/:id', editproduct)

router.delete('/:id', deleteproduct)

module.exports = router