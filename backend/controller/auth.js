const user = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const tickets = require('../models/Ticket');

const authuser = async(req, res, next) => {
    const User = await user.findOne({ _id: req.user });
    console.log(User);
    if (!User) {
        return next({
            status: 400,
            errors: "User does not exists"
        });
    }
    return res.status(200).json(User);
};



const isBooked = async(req, res, next) => {
    if (!ObjectId.isValid(req.params.busId)) {

        return next({
            status: 400,
            errors: "Invalid Object Id"
        });
    }

    const bookedtickets = await tickets.find({ busId: req.params.busId }, 'passengers ');

    const totalBookedTickets = [];

    if (Object.keys(bookedtickets).length) {
        bookedtickets.forEach(passengers => {
            passengers.passengers.forEach(ticket => {
                totalBookedTickets.push(ticket.seat_no);
            });
        });
        return res.status(200).json({ tickets: totalBookedTickets });
    }

    return res.status(200).json({ tickets: [] });
};

module.exports = {
    authuser,
    isBooked
};