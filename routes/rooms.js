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
            // load room.ejs view
            res.render('rooms', {
                title: 'Posts for rooms',
                rooms: rooms,
                user: req.user
            })
        }
    });
});

router.get('/add', function(req, res, next) {
    // load the blank form
    res.render('add-room', {
        title: 'Add a New Room'
    });
});

router.post('/add', function(req, res, next) {
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

router.get('/:id', function(req, res, next) {

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

router.post('/:id', function(req, res, next) {
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

module.exports = router;
