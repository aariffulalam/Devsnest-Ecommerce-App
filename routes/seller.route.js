const router = require("express").Router();

const { getsellers, getsellerbyid, postseller, updateseller, editseller } = require('../controller/seller.controller')


// get all sellers
router.get('/', getsellers);

// get seller by id
router.get('/:id', getsellerbyid)

// post seller
router.post('/', postseller)

// post update object seller
router.patch('/:id', updateseller)

// edit seller
router.put('/:id', editseller)

module.exports = router;