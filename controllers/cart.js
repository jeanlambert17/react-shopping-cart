const express = require('express');
const db = require('./../helpers/db');
const cartQueries = require('./../helpers/queries').cart;
const isLoggedIn = require('./../middlewares/isLogged').isLoggedIn;

let router = express.Router();

// Add product to user's cart
router.post('/add', isLoggedIn, (req, res) => {
    let cartId = req.session.passport.user.cartid;
    let {productId,quantity} = req.body;
    db.none(cartQueries.addItem, [cartId,productId,quantity])
    .then(()=> {
        res.status(200).send({response:'Success'});
    }).catch((error) => {
        console.log(error);
        res.status(500).send({response:'Try again'})
    })
});

// Delete product from user's cart
router.post('/delete', isLoggedIn, (req,res) => {
    let cartId = req.session.passport.user.cartid;
    let { productId } = req.body;
    db.none(cartQueries.deleteItem, [cartId,productId])
    .then(() => {    
        res.status(200).send({ response: 'Success' })
    }).catch((error) => {
        console.log(error)
        res.status(500).send({ response: 'Try again' })
    })
})

// TODO : Filtrar por existencia
// Get user's cart items
router.get('/items', isLoggedIn, (req,res) => {
    let cartId = req.session.passport.user.cartid;
    db.manyOrNone(cartQueries.getItems, [cartId])
    .then((items) => {
        res.status(200).send({items:items});
    }).catch((error) => {
        res.status(500).send({response:'Try again'});
    })
})

module.exports = router