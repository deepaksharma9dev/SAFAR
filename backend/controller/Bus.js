const { check, validationResult } = require('express-validator');
const bus = require('../models/Bus');
const staff = require('../models/Staff');
const locations = require('../models/Location');
const agency = require('../models/Agency');
const ObjectId = require('mongoose').Types.ObjectId;
const tickets = require('../models/Ticket');



const findBus = async(busmodel, BusNumber) => {
    const bus = await busmodel.findOne({ vehicleNo: BusNumber });
    if (Boolean(bus)) {
        return {
            status: 400,
            errors: "bus already exists"
        };
    } else {
        return bus;
    }
};

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

// for creating seats

const createSeats = async(SeatQuantity) => {
    let seats = [];
    let charecter = 65;
    for (let line = 0; line < SeatQuantity; line++) {
        seats.push([]);
        for (let seat = 1; seat <= 4; seat++) {
            seats[line].push(seat + String.fromCharCode(charecter));
        }
        charecter++;
    }

    return seats;

};

//addstaff

const addstaff = async(staffModel, staffcontacts) => {
    let values = [];
    staffcontacts.forEach(contact => {
        values.push({
            phone: contact
        });
    });
    const staffs = await staffModel.find({ $or: values });

    return staffs;
};


//finds starting location

const findFromlocation = async(LocationModel, location) => {
    const fromLocation = await LocationModel.findOne({ city: location }).select('id');
    return fromLocation;
};


//finds destination locations

const findDestinationlocation = async(LocationModel, location) => {
    const toLocation = await LocationModel.findOne({ city: location }).select('id');
    return toLocation;
};


const validBus = async(busname, agency) => {
    const IsAgencyExists = await agency.findOne({ agencyName: busname });
    if (IsAgencyExists) {
        return true;
    } else {
        return false;
    }
};


const addBus = async(req, res, next) => {
    const errors = await validation(req);
    if (errors) {
        return next(errors);
    }


    const {
        busName,
        vehicleNo,
        seats,
        busType,
        seatCategory,
        policy,
        image,
        Staff_Number,
        from,
        to,
        arrivalTime,
        departureTime,
        schedule
    } = req.body;

    let Bus = await findBus(bus, vehicleNo);


    if (Boolean(Bus)) {

        return next(Bus);
    }


    Bus = new bus({
        busName,
        vehicleNo,
        busType,
        seatCategory,
        policy,
        image,
        arrivalTime,
        departureTime,
        schedule,
        adminId: req.user
    });
    //creating seats



    let Seats = await createSeats(seats);

    // adding staff

    const staffs = await addstaff(staff, Staff_Number);
    if (staffs == false) {
        return next({
            status: 400,
            errors: "Numbers are invalid or staff does not exists"
        });
    }
    if (from === to) {
        return next({
            status: 400,
            errors: "Both locations be Same"
        });
    }
    const Agency = await validBus(busName, agency);
    if (!Agency) {
        return next({
            status: 400,
            errors: "agency does not exists"
        });
    }

    let fromlocation = await findFromlocation(locations, from);
    let tolocation = await findFromlocation(locations, to);

    if (!fromlocation) {
        return next({
            status: 400,
            errors: `${from} does not exists`
        });
    }

    if (!tolocation) {
        return next({
            status: 400,
            errors: `${to} does not exists`
        });
    }

    Bus.seats = Seats;
    Bus.busStaff = staffs;
    Bus.from = fromlocation;
    Bus.to = tolocation;
    // console.log(Bus);
    await Bus.save();

    return res.status(200).json({ msg: "bus has created successfully" });

};


const searchBus = async(req, res, next) => {

    const buses = [];

    if (!Object.keys(req.query).length || (!req.query.hasOwnProperty("from") && !req.query.hasOwnProperty("to"))) {
        return next({
            status: 400,
            errors: "you must have select your starting stop and destination"
        });
    }
    const filter = {};


    if (req.query.hasOwnProperty("busType")) {
        filter.busType = req.query.busType;
    }
    if (req.query.hasOwnProperty("seatCategory")) {
        filter.seatCategory = req.query.seatCategory;
    }


    const AllBuses = await bus.find(filter)
        .populate('from', ['city', 'state'])
        .populate('to', ['city', 'state']);

    // console.log(searchedBuses);


    //getting location id from locations

    const starting_location = await findFromlocation(locations, req.query.from);

    if (!starting_location) {
        return next({
            status: 400,
            errors: `${req.query.from} does not exists`
        });
    }

    const destination_location = await findDestinationlocation(locations, req.query.to);

    if (!destination_location) {
        return next({
            status: 400,
            errors: `${req.query.to} does not exists`
        });
    }
    // console.log(searchedBuses);      
    //finding bus with matching location 

    AllBuses.forEach(busData => {
        if (busData.from._id.toString() === starting_location._id.toString() &&
            busData.to._id.toString() === destination_location._id.toString()) {
            buses.push(busData);
        }
    });
    return res.status(200).json({ buses: buses });
};


const searchBusById = async(req, res, next) => {
    if (!req.params.hasOwnProperty("busId")) {
        return next({
            status: 400,
            errors: "You must have given a BusId"
        });
    }

    if (!ObjectId.isValid(req.params.busId)) {
        return next({
            status: 400,
            errors: "Invalid Object Id"
        });
    }


    const searchedBus = await bus.findOne({ _id: req.params.busId })
        .populate('from', ['city', 'state'])
        .populate('to', ['city', 'state']);
    return res.status(200).json({ bus: searchedBus });
};


const removeBus = async(req, res, next) => {
    if (!req.params.hasOwnProperty("busId")) {
        return next({
            status: 400,
            errors: "You must have given a BusId"
        });
    }

    if (!ObjectId.isValid(req.params.busId)) {
        return next({
            status: 400,
            errors: "Invalid Object Id"
        });
    }
    const searched_bus = await bus.findOne({ _id: req.params.busId });
    // console.log(searched_bus);
    if (!searched_bus) {
        return next({
            status: 400,
            errors: "Bus does not exists"
        });
    }
    await bus.findOneAndRemove({ _id: req.params.busId });
    await tickets.findOneAndRemove({ busId: req.params.busId });
    return res.status(200).json({ msg: "bus has removed" });
};


const rescheduleBus = async(req, res, next) => {
    if (!req.params.hasOwnProperty("busId")) {
        return next({
            status: 400,
            errors: "You must have given a BusId"
        });
    }

    if (!ObjectId.isValid(req.params.busId)) {
        return next({
            status: 400,
            errors: "Invalid Object Id"
        });
    }

    const searched_bus = await bus.findOne({ _id: req.params.busId });
    // console.log(searched_bus);
    if (!searched_bus) {
        return next({
            status: 400,
            errors: "Bus does not exists"
        });
    }

    await tickets.findOneAndRemove({ busId: req.params.busId });

    return res.status(200).json({ msg: "bus has rescheduled" });

};


const availableSeats = async(req, res, next) => {
    if (!req.params.hasOwnProperty("busId")) {
        return next({
            status: 400,
            errors: "You must have given a BusId"
        });
    }

    if (!ObjectId.isValid(req.params.busId)) {
        return next({
            status: 400,
            errors: "Invalid Object Id"
        });
    }

    const searched_bus = await bus.findOne({ _id: req.params.busId });
    // console.log(searched_bus);
    if (!searched_bus) {
        return next({
            status: 400,
            errors: "Bus does not exists"
        });
    }

    let bookedTickets = await tickets.find({ busId: req.params.busId }, 'passengers');


    let booked_seats = [];

    bookedTickets.forEach(tickets => {
        tickets.passengers.forEach(seats => {
            booked_seats.push(seats.seat_no);
        });
    });

    // console.log(booked_seats);


    booked_seats.forEach(booked => {
        searched_bus.seats.forEach(seats => {
            if (seats.includes(booked)) {
                seats.splice(seats.indexOf(booked), 1);
            }

        });
    });

    console.log(searched_bus.seats);
    console.log(Boolean(booked_seats));

    // console.log(bookedTickets);
    return res.status(200).json({ seats: `availabe seats ${searched_bus.seats} and ${(booked_seats.legth)?booked_seats:"No"} booked seats` });

};

module.exports = { addBus, searchBus, searchBusById, removeBus, rescheduleBus, availableSeats };