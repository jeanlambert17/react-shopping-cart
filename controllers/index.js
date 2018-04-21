const express = require('express')

let router = express.Router()

router.use('/user', require('./users'));
router.use('/product', require('./products')); 
router.use('/cart', require('./cart'));

module.exports = router;