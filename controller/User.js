require('dotenv').config();
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const ObjectId = require('mongoose').Types.ObjectId;
// const config = require('config');
let mySecret;
// if (config.has('My_Secret_Key')) {
//     mySecret = config.get('My_Secret_Key');
// }
// const mySecret = config.get('My_Secret_Key');



//-----------------------custom functions----------------------
//func for validation of request inputs

const validation = (request) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return {
            status: 400,
            errors: errors.array()
        };
    } else {
        return false;
    }
};

//func for finding a user

const findUser = async(Email) => {

    let user = await User.findOne({ email: Email });
    if (user) {
        return user;
    } else {
        return false;
    }
};
//for checking the entered password

const checkPassword = async(Entered_Password, bcrypted) => {
    const isPassword = await bcrypt.compare(Entered_Password, bcrypted);
    return isPassword;
};
//-------------------------------------------------------------

//for making a token

const authorization = function(payload, secret = mySecret) {
    const token = Jwt.sign(payload, secret);
    return token;
};

//for verifiying the user's token

const authentication = function(token, secret = mySecret) {
    const decoded = Jwt.verify(token, secret);
    return decoded;
};

const createUser = async(req, res, next) => {
    const errors = await validation(req);
    if (errors) {
        return next(errors);
    }

    const { name, email, password } = req.body;

    //for finding an user 

    let user = await User.findOne({ email });
    // console.log(user);
    if (user) {
        return next({
            status: 400,
            errors: "User is already exists"
        });
    }



    user = new User({
        name,
        email,
        password
    });
    // console.log(user);

    //bcrypting the passoword

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // console.log(user.password, "encrypted password");

    await user.save();

    //payload
    // console.log(user, "user");
    let payload = {
        id: user.id,
        Admin: user.isAdmin
    };

    //making a token

    const token = await authorization(payload);
    // console.log(token);
    return res.status(200).json({ token });


};



const loginUser = async(req, res, next) => {
    const errors = await validation(req);
    if (errors) {
        return next(errors);
    }
    // call for find an user
    const { email, password } = req.body;

    const user = await findUser(email);

    if (user === false) {
        return next({
            status: 404,
            errors: "User not found"
        });
    }

    //verifying the password of the user

    const password_verification = await checkPassword(password, user.password);
    if (password_verification === false) {
        return next({
            status: 400,
            errors: "Incorrect password"
        });
    }

    let payload = {
        id: user.id,
        Admin: user.isAdmin
    };


    //making a token
    const token = await authorization(payload);
    return res.status(200).json({ token });

};



//book a ticket

const assignSeats = async(seats, passengers) => {
    for (let seat = 0; seat < seats.length; seat++) {
        passengers[seat].seat_no = seats[seat];
    }
    return passengers;
};

const isBooked = async(ticketModel, busid, userid, seats) => {

    const isbooked = await ticketModel.find({ userId: userid, busId: busid });

    const bookings = [];
    const alreadyBooked = [];
    isbooked.forEach(Passenger => {
        Passenger.passengers.forEach(booked => {
            bookings.push(booked.seat_no);
        });
    });

    seats.forEach(requestedTicket => {
        if (bookings.includes(requestedTicket)) {
            alreadyBooked.push(requestedTicket);
        }
    });

    return alreadyBooked;
};


//for booking a ticket
const bookTicket = async(req, res, next) => {
    const errors = await validation(req);
    if (errors) {
        return next(errors);
    }
    // console.log("working");
    let { seats, passengers, contactNo, journeyDate } = req.body;


    if (seats.length !== passengers.length) {
        return next({
            status: 400,
            errors: "Invalid Input"
        });
    }

    passengers = await assignSeats(seats, passengers);

    if (!ObjectId.isValid(req.params.busId)) {

        return next({
            status: 400,
            errors: "Invalid Object Id"
        });
    }

    const IsBooked = await isBooked(Ticket, req.params.busId, req.user, seats);

    if (IsBooked.length) {
        return next({
            status: 400,
            errors: `these seats are already booked ${IsBooked.toString()}`
        });
    }


    let busId = req.params.busId;

    let ticket = new Ticket({
        passengers,
        userId: req.user,
        busId,
        contactNo,
        journeyDate
    });

    await ticket.save();
    res.status(200).json({ msg: "your ticket has booked successfully" });
};




const cancelTickets = async(req, res, next) => {

    if (!ObjectId.isValid(req.params.ticketId)) {
        return next({
            status: 400,
            errors: "Invalid Object Id"
        });
    }

    let currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    let tickets = await Ticket.findOne({ userId: req.user });

    let journeyDate = new Date(tickets.journeyDate.toString()).toJSON().slice(0, 10).replace(/-/g, '-');
    // console.log(journeyDate);
    currentDate = currentDate.split('-');
    journeyDate = journeyDate.split('-');

    let greater_than = 0;
    for (let date = 0; date < journeyDate.length; date++) {
        if (Number(currentDate[date]) <= Number(journeyDate[date])) {
            greater_than++;
        }
    }

    if (greater_than === 3) {
        await Ticket.findOneAndDelete({ _id: req.params.ticketId });
        return res.status(200).json({ msg: "ticket has deleted" });
    }

    return next({
        status: 400,
        errors: "you cannot cancel the tickets"
    });
};


const getTickets = async(req, res, next) => {
    const tickets = await Ticket.find({ userId: req.user });
    if (!tickets.length) {
        return next({ status: 400, errors: "You have not booked any ticket" });
    }

    console.log(tickets);
    res.status(200).json({ tickets: tickets });
};

module.exports = { createUser, loginUser, bookTicket, findUser, authentication, cancelTickets, getTickets };