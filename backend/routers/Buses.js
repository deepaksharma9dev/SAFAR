const Router = require('express').Router();
const { check, validationResult } = require('express-validator');
const isVerify = require('../middleware/isVerify');
const { searchBus, searchBusById, removeBus, rescheduleBus, availableSeats } = require('../controller/Bus');
const isAdmin = require('../middleware/isAdmin');

/*
@Route Get 
api/buses/GetBuses
desc find buses by filter 
@Private
*/


Router.get('/GetBuses', isVerify, searchBus);


/*
@Route Get 
api/buses/bus/:busId
desc find bus by BusId
@Private
*/


Router.get('/bus/:busId', isVerify, searchBusById);


/*
@Route Delete
api/buses/bus/:busId
desc delete bus by busId
@Private - Admin
*/

Router.delete('/bus/:busId', isAdmin, removeBus);


/*
@Route post
api/buses/bus/reschedule
desc cancels all rides and reschdule bus
@Private - Admin
*/

Router.get('/bus/reshedule/:busId',
    isAdmin,
    rescheduleBus
);


/*
@Route get
api/buses/bus/:busId/seats/
desc getting the status of seats of a bus
@Private 
*/


Router.get('/bus/:busId/seats',
    isVerify,
    availableSeats);


module.exports = Router;