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
app.use(passport.initialize()); 
app.use(passport.session()); 
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use('/', require('./controllers'));

app.listen(10036, function () {
    console.log('Example app listening on port 10036!');
});

