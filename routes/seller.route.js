const router = require("express").Router();

const { getsellers, getsellerbyid, postseller, updateseller, editseller } = require('../controller/seller.controller')


// get all sellers
router.get('/sellers', getsellers);

// get seller by id
router.get('/seller/:id', getsellerbyid)

// post seller
router.post('/seller', postseller)

// post update object seller
router.patch('/seller/:id', updateseller)

// edit seller
router.put('/seller/:id', editseller)

module.exports = router;