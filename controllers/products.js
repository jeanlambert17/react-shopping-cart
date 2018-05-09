const express = require('express');
const db = require('./../helpers/db');
const productQueries = require('./../helpers/queries').product;
const isLoggedIn = require('./../middlewares/isLogged').isLoggedIn;

let router = express.Router();

router.post('/new', isLoggedIn, (req,res) => {
    let userId = req.session.passport.user.userid;
    let {brand,price,name,description,stock} = req.body;
    db.none(productQueries.addProduct, [userId,brand,price,name,description,stock])
    .then(() => {
        res.status(200).send({
            status:200,
        });
    }).catch((error) => {
        console.log(error)
        res.status(500).send({
            status:500,
        })
    })
});

router.post('/delete', isLoggedIn, (req,res) => {
    let userId = req.session.passport.user.userid;
    let productId = req.body.productId;
    db.tx('delete-product', async t => {
        await t.none(productQueries.deleteProductFromCarts, [productId]);
        await t.none(productQueries.deleteProduct, [userId, productId]);
    }).then((data) => {
        res.status(200).send({
            status: 200,
        })
    }).catch((error) => {
        console.log(error)
        res.status(500).send({
            status: 500,
        })
    })
});

router.post('/modify', isLoggedIn, (req,res) => {
    let userId = req.session.passport.user.userid;
    let { productId,name,description,stock,price,brand } = req.body
    db.none(productQueries.modifyProduct, [userId,productId,name,description,stock,price,brand])
    .then(() => {
        res.status(200).send({status:200});
    }).catch((error) => {
        console.log(error)
        res.status(500).send({status:500});
    })
})

router.get('/list/:search', (req, res) => {
    db.any(productQueries.findProduct, [`%${req.params.search}%`])
    .then((data) => {
        res.status(200).send({
            status:200,
            list: data
        })
    }).catch((error) => {        
        res.status(403).send({
            status:403,
        })
    })
});

router.get('/list', (req,res) => {
    db.any(productQueries.findProducts)
    .then((data) => {
        res.status(200).send({
            status:200,
            list:data,
        })
    }).catch((error) => {
        console.log(error)
        res.status(403).send({
            status:403,
        })
    })
});

router.get('/userProducts', isLoggedIn, (req,res) => {
    let userId = req.session.passport.user.userid;
    db.any(productQueries.userProducts, [userId])
    .then((data) => {
        res.status(200).send({
            list:data,
        })
    }).catch((error) => {
        res.status(403).send({
            status:403,
        })
    })
});

module.exports = router