const express = require('express');
const db = require('./../helpers/db')
const userQueries = require('./../helpers/queries').userQueries;
const user = require('./../middlewares/isNew');
const isLogged = require('./../middlewares/isLogged');
const bcrypt = require('bcryptjs');

let router = express.Router();

router.post('/signup', isLogged.isLoggedOut, user.isNew, (req, res) => {
    db.connect().then((obj) => {
        let hash = bcrypt.hashSync(req.body.password, 10);
        obj.one(userQueries.addUser, [req.body.username, hash, req.body.firstname, req.body.lastname, req.body.email])
            .then((data) => {
                obj.done();
                res.send({
                    status: 200,
                    response: 'Success'
                });
            }).catch((error) => {
                obj.done();
                res.send({
                    status: 500,
                    response: 'Try again'
                });
            });
    });
});

router.post('/login', isLogged.isLoggedOut, (req, res) => {
    db.connect().then((obj) => {
        obj.one(userQueries.findUser, [req.body.username]).then((user) => {
            bcrypt.compare(req.body.password, user.password).then((isMatch) => {
                if(isMatch) {
                    delete user['password']
                    req.logIn(user, (err) => {
                        if(err)
                            return res.status(500).send({
                                status: 500,
                                response: 'Could not log in user',
                            })
                        res.status(200).send({
                            status: 200,
                            response: 'Login successful!',
                        })
                    })
                } else {
                    res.send({
                        status: 422,
                        response: 'Wrong password',
                    });
                }          
            })
        }).catch((error) => {
            res.send({
                status: 422,
                response: 'User not found',
            });
        });
    });
});

// LOGOUT
router.get('/logout', isLogged.isLoggedIn, (req, res) => {
    req.logout();
    res.status(200).send({
        response: 'Bye!'
    })
})

// GET user's data
router.get('/login', (req,res) => {    
    res.send({
        session: req.session.passport,
    })
})

module.exports = router;