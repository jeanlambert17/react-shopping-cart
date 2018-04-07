const express = require('express');
let router = express.Router();

router.use('/user', require('./users'))
router.use('/products', require('./products')); 

module.exports = router;