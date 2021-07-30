const mongoose = require('mongoose');
const Agency = new mongoose.Schema({
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    phone: {
        type: Number,
        require: true
    },
    agencyName: {
        type: String,
        require: true,
        index: true
    },
    headOfficeLocation: {
        type: String
    }
}, {
    timestamps: true
});
const agency = mongoose.model('Agency', Agency);
module.exports = agency;