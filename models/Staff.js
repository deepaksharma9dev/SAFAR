const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency'
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isDriver: {
        type: Boolean,
        default: true,
        required: true,
        index: true
    }

}, {
    timestamps: true
});

const staff = mongoose.model('Staff', staffSchema);
module.exports = staff;