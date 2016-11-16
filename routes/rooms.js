var express = require('express');
var router = express.Router();

var Room = require('../models/room');

/* GET home page. */
router.get('/', function(req, res, next) {
    Room.find(function(err, rooms) {
        if (err) {
            console.log(err);
            res.redirect('error');
        }
        else {
            // load teams.ejs view
            res.render('rooms', {
                title: 'Posts for rooms',
                rooms: rooms,
                user: req.user
            })
        }
    });
});

module.exports = router;
