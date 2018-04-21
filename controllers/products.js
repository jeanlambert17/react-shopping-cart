const express = require('express');
const db = require('./../helpers/db');
const productQueries = require('./../helpers/queries').product;
const isLoggedIn = require('./../middlewares/isLogged').isLoggedIn;

let router = express.Router();

router.get('/add', (req, res) => {
    res.status(200).send('Hola');
});

router.post('/new', isLoggedIn, (req,res) => {
    let userId = req.session.passport.user.userid;
    db.none(productQueries.addProduct, [userId,req.body.brand,req.body.price,req.body.name,req.body.description,req.body.stock])
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
    db.result(productQueries.deleteProduct, [userId, req.body.productId])
    .then((result) => {              
        if(result.rowCount > 0) {
            res.status(200).send({
                status:200,
            })
        } else {
            res.status(403).send({
                status:403,
            })
        } 
    }).catch((error) => {        
        console.log(error);
        res.status(500).send({
            status: 500,
        })
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
})

module.exports = router