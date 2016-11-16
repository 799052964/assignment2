var mongoose = require('mongoose');

// create a room schema to define this class
var roomSchema = new mongoose.Schema({
    location: {
        type: String,
        required: 'Location cannot be blank'
    },
    bedroom: {
        type: Number,
        min: 0
    },
    price: {
        type: Number,
        min: 0
    },
    introduction: {
        type: String
    }
});

module.exports = mongoose.model('Room', roomSchema);