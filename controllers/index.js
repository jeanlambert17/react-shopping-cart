const express = require('express');
let router = express.Router();

router.use('/user', require('./users'))
router.use('/product', require('./products')); 

module.exports = router;