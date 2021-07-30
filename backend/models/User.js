const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        Unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
            // match: /^ ( ? = .* ? [A - Z])( ? = .* ? [a - z])( ? = .* ? [0 - 9])( ? = .* ? [# ? !@$ % ^ & * -]). { 8, }$ /
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


const User = mongoose.model('Users', userschema);
module.exports = User;