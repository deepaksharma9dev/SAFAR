const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema({
    passengers: [{
        seat_no: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
    }],
    contactNo: {
        type: Number,
        required: true
    },
    journeyDate: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require: true,
        index: true
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buses',
        require: true,
    }
}, {
    timestamps: true
});

const Tickets = mongoose.model('tickets', ticketSchema);
module.exports = Tickets;