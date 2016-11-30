var express = require('express');
var router = express.Router();

var Room = require('../models/room');

// get the room page
router.get('/',  function(req, res, next) {
    Room.find(function(err, rooms) {
        if (err) {
            console.log(err);
            res.redirect('error');
        }
        else {
            // load room.ejs view
            res.render('rooms', {
                title: 'Posts for rooms',
                rooms: rooms,
                user: req.user
            })
        }
    });
});

// get add a room page
router.get('/add',isLoggedIn, function(req, res, next) {
    // load the blank form
    res.render('add-room', {
        title: 'Add a New Room',
        user: req.user
    });
});

// save the room into database
router.post('/add',isLoggedIn, function(req, res, next) {
    // use the mongoose model to add the new record

    Room.create( {
        location: req.body.location,
        bedroom: req.body.bedroom,
        price: req.body.price,
        introduction: req.body.introduction
    }, function(err, Room) {
        if (err) {
            console.log(err);
            res.redirect('/error');
        }
        else {
            // redirect to the updated rooms view
            res.redirect('/rooms');
        }
    });
});

// get the edit room page
router.get('/:id',isLoggedIn, function(req, res, next) {

    // look up the selected room
    var id = req.params.id;

    Room.findById(id, function(err, room) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // load edit room view
            res.render('edit-room', {
                title: 'Room Details',
                room: room,
                user: req.user
            });
        }
    });
});

// update the room
router.post('/:id',isLoggedIn, function(req, res, next) {
    // get the id from the url
    var id = req.params.id;

    // create a new room object and populate it from the form values
    var room = new Room({
        _id: id,
        location: req.body.location,
        bedroom: req.body.bedroom,
        price: req.body.price,
        introduction: req.body.introduction
    });

    // try the update
    Room.update({ _id: id }, room, function(err) {
        if (err) {
            console.log(err);
            res.render('/error');
        }
        else {
            res.redirect('/rooms');
        }
    });
});

// check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/login');
    }
}

module.exports = router;
