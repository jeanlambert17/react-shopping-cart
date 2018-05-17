const express = require('express');
const db = require('./../helpers/db');
const billQueries = require('./../helpers/queries').bill;
const cartQueries = require('./../helpers/queries').cart;
const isLoggedIn = require('./../middlewares/isLogged').isLoggedIn;

let router = express.Router();

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