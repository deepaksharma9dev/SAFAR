const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        index: true
    },
    state: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const location = mongoose.model('location', locationSchema);
module.exports = location;