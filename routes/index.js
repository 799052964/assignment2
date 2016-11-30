var express = require('express');
var router = express.Router();

var Account = require('../models/account');
var passport = require('passport');

// get the home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' ,
                        user:req.user});
});

// get the login page
router.get('/login', function(req, res, next) {

    var messages = req.session.messages || [];

    // clear out the session messages
    req.session.messages = [];

    if (req.user) {
        res.redirect('/rooms');
    }
    else {
        res.render('login', {
            'title': 'Login',
            messages: messages,
            user: req.user
        });
    }
});

// post the login page
router.post('/login', passport.authenticate('local',
    {
      successRedirect: '/rooms',
      failureRedirect: '/login',
      failureMessage: 'Invalid Login' // automatically stored in req.session.messages
    }
));

// get the register page
router.get('/register', function(req, res, next) {
    res.render('register', {
        'title': 'Register',
        user: req.user
    });
});

// post the register page
router.post('/register', function(req, res, next) {
    // create a new account
    Account.register(new Account({ username: req.body.username }), req.body.password,
        function(err, account) {
            if (err) {
                console.log(err);
                res.redirect('/error');
            }
            else {
                res.redirect('/login');
            }
        }
    );
});

// get logout page
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
