const express = require('express');
const db = require('./../helpers/db');
const userQueries = require('./../helpers/queries').user;
const isNew = require('./../middlewares/isNew').isNew;
const isLogged = require('./../middlewares/isLogged');
const bcrypt = require('bcryptjs');

let router = express.Router();

router.post('/signup', isLogged.isLoggedOut, isNew, (req, res) => {
    db.task('insert-user', async task => {
        let hash = bcrypt.hashSync(req.body.password, 10);
        const newId = await task.one(userQueries.addUser, [req.body.username, hash, req.body.firstname, req.body.lastname, req.body.email], q => q && q.id_user);
        if (newId) {
            await task.none(userQueries.addCart, newId);            
        }
        return { newId }
    }).then((data) => {
        res.status(200).send({
            status: 200,
            response: 'Success'
        });
    }).catch((error) => {
        console.log(error)
        res.status(500).send({
            status: 500,
            response: 'Try again'
        });
    })
});

router.post('/login', isLogged.isLoggedOut, (req, res) => {
    db.connect().then((obj) => {
        obj.one(userQueries.findUser, [req.body.username]).then((user) => {
            obj.done();
            bcrypt.compare(req.body.password, user.password).then((isMatch) => {
                if (isMatch) {
                    delete user['password']
                    req.logIn(user, (err) => {
                        if (err)
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
                    res.status(422).send({
                        status: 422,
                        response: 'Wrong password',
                    });
                }
            })            
        }).catch((error) => {
            res.status(422).send({
                status: 422,
                response: 'User not found',
            });
        });
    }).catch((error) => {
        console.log(error)
        res.status(503).send({
            status: 503,
            response: 'Try again',
        });
    });
});

// LOGOUT
router.get('/logout', isLogged.isLoggedIn, (req, res) => {
    req.logout();
    res.status(200).send({
        status: 200,
    })
})

// GET user's data
router.get('/login', (req, res) => {
    res.status(200).send({
        session: req.session.passport,
    })
})

module.exports = router;