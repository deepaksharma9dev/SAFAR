const Router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { createUser, loginUser, bookTicket, cancelTickets, getTickets } = require('../controller/User');
const { emailVerifier } = require('../extra_features/emailVerify');
const isVerify = require('../middleware/isVerify');

//@route  Post /api/users/user/signup
//desc    Create a user
//access  Public

Router.post('/user/signup', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    emailVerifier
], createUser);

//@Route POST `/api/users/user/login`
//describe Log in user
// access authorised

Router.post('/user/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    emailVerifier,
], loginUser);


//@Route POST `/api/users/user/buses/busId/bookticket`
//describe booking a ticket
// access private

Router.post('/user/buses/:busId/bookticket', [
    check('seats', 'seats is required').isLength({ min: 1 }),
    check('passengers', 'passengers is required').isLength({ min: 1 }),
    isVerify
], bookTicket);



Router.delete('/user/tickets/ticket/:ticketId', isVerify, cancelTickets);


Router.get('/user/tickets', isVerify, getTickets);

module.exports = Router;