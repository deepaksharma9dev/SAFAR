const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    busName: {
        type: String,
        required: true
    },
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency'
    },
    vehicleNo: {
        type: String,
        unique: true,
        required: true
    },
    seats: [
        [{
            type: String,
        }]
    ],
    busType: {
        type: String,
        enum: ['Ac', 'NonAc'],
        default: 'Ac',
        required: true
    },
    seatCategory: {
        type: String,
        enum: ['sleeper', 'semi sleeper'],
        default: 'sleeper',
        required: true
    },
    busStaff: [{
        type: String,
        required: true
    }],
    policy: {
        type: String,
        required: true
    },
    image: [{
        type: String
    }],
    from: {
        // index
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location',
        index: true,
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location',
        required: true,
        index: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true,
    },
    schedule: [{
        type: Number,
        required: true
    }]
}, {
    timestamps: true
});
const bus = mongoose.model('Buses', busSchema);
module.exports = bus;