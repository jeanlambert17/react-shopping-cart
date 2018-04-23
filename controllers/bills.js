const express = require('express');
const db = require('./../helpers/db');
const billQueries = require('./../helpers/queries').bill;
const cartQueries = require('./../helpers/queries').cart;
const isLoggedIn = require('./../middlewares/isLogged').isLoggedIn;

let router = express.Router();
//Create a bill for user
router.post('/bill', isLoggedIn, (req, res) =>{
    db.task('new-bill', async task =>{
        let billprice;
        let userId = req.session.passport.user.userid;
        let cartId = req.session.passport.user.cartid;
        let timestamp = getTimeStamp();
        const billId = await task.one(billQueries.createBill,[userId, 1, timestamp]);
        await task.manyOrNone(cartQueries.getItems, [cartId])
        .then((items) =>{
            items.forEach(item => {
                billprice = billprice + item.price;
                task.None(billQueries.addItem, [billId, item.idproduct, item.quantity])
            });
            task.result(billQueries.updateAmount, [billprice, billId])
            .then((result) =>{
                if(result.rowCount > 0) {
                    res.status(200).send({
                        status:200,
                    })
                } else {
                    res.status(403).send({
                        status:403,
                    })
                }
            }).catch((error) =>{
                console.log(error);
                res.status(500).send({
                    status: 500,
                    response: 'Try again'
                });
            })
        }).catch((error) =>{
            console.log(error);
            res.status(500).send({
                staus: 500,
                response: 'Try again'
            });
        });
    }).catch((error) =>{
        console.log(error);
        res.status(500).send({
            staus: 500,
            response: 'Try again'
        });
    });
});

function getTimeStamp() {
    var now = new Date();
    return ((now.getDate() ) + '/' +
            (now.getMonth() + 1) + '/' +
             now.getFullYear() + " " +
             now.getHours() + ':' +
             ((now.getMinutes() < 10)
                 ? ("0" + now.getMinutes())
                 : (now.getMinutes())) + ':' +
             ((now.getSeconds() < 10)
                 ? ("0" + now.getSeconds())
                 : (now.getSeconds())));
}

module.exports = router;