const express = require('express');
const db = require('./../helpers/db');
const productQueries = require('./../helpers/queries').productQueries;
const isLoggedIn = require('./../middlewares/isLogged').isLoggedIn;

let router = express.Router();

router.post('/new', isLoggedIn, (req,res) => {
    let userId = req.session.passport.user.id_user;
    db.none(productQueries.addProduct, [userId,req.body.brand,req.body.price,req.body.name,req.body.description,req.body.stock])
    .then(() => {
        res.send({
            status:200,
        });
    }).catch((error) => {
        res.send({
            status:500,
        })
    })
});

router.post('/delete', isLoggedIn, (req,res) => {
    let userId = req.session.passport.user.id_user;
    db.result(productQueries.deleteProduct, [userId, req.body.id_product])
    .then((result) => {              
        if(result.rowCount > 0) {
            res.send({
                status:200,
            })
        } else {
            res.send({
                status:403,
            })
        } 
    }).catch((error) => {        
        console.log(error);
        res.send({
            status: 500,
        })
    })
})

router.get('/list/:search', (req, res) => {
    db.any(productQueries.findProduct, [`%${req.params.search}%`])
    .then((data) => {
        res.send({
            status:200,
            list: data
        })
    }).catch((error) => {        
        res.send({
            status:500,
        })
    })
});

module.exports = router