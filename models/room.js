var mongoose = require('mongoose');

// create a room schema to define this class
var roomSchema = new mongoose.Schema({
    location: {
        type: String,
        required: 'Location cannot be blank'
    },
    bedroom: {
        type: Number,
        min: 0,
        required: 'Bedroom cannot be blank'
    },
    price: {
        type: Number,
        min: 0,
        required: 'Price cannot be blank'
    },
    introduction: {
        type: String,
        required: 'Introduction cannot be blank'
    }
});

module.exports = mongoose.model('Room', roomSchema);