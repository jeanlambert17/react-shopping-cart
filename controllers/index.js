const express = require('express')

let router = express.Router()

router.use('/user', require('./users'));
router.use('/product', require('./products')); 
router.use('/cart', require('./carts'));
router.use('/bill', require('./bills'));

module.exports = router;