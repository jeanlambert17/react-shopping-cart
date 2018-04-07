const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize()); // NPI
app.use(passport.session()); 
passport.serializeUser(function (user, done) { // NPI
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./controllers'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

