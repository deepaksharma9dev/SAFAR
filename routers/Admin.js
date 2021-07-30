const Router = require('express').Router();
const { check, validationResult } = require('express-validator');
const isAdmin = require('../middleware/isAdmin');
const { createAdmin, logInAdmin, AdminDashboard } = require('../controller/Admin');
const { AddLocation } = require('../controller/Locations');
const isVerify = require('../middleware/isVerify');
const { addAgency, deleteAgency } = require('../controller/Agency');
const { createStaff } = require('../controller/Staff');
const { addBus } = require('../controller/Bus');


//@route  Post api/admins/admin/signup
//desc    Create a admin
//access  Private
//authorized Route
Router.post('/admin/signup', [
    check('admin_email', 'admin email is required').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    })
], createAdmin);


//@route  Post api/admins/admin/login
//desc    login an admin
//access  Private
//authorized Route
Router.post('/admin/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    // isAdmin
], logInAdmin);


//@route `api/admins/admin/location`
//desc    Create a location
//access  Private
//authorized Route


Router.post('/admin/location', [
    check('city', 'city is required').not().isEmpty(),
    check('state', 'state is required').not().isEmpty(), isAdmin
], AddLocation);



//@route `api/admins/admin/Agency`
//desc    Create an agency
//access  Private
//authorized Route

Router.post('/admin/agency', [
    check('phone', 'phone number is required').notEmpty(),
    check("agencyName", 'Agency Name is required').notEmpty(),
    check('headOfficeLocation', 'headOfficeLocation is required').notEmpty(),
    isAdmin
], addAgency);


//@route `api/admins/admin/Agency`
//desc    Delete an agency
//access  Private
//authorized Route


Router.delete('/admin/agency', [
    check("agencyName", 'Agency Name is required').notEmpty(),
    isAdmin
], deleteAgency);


//@route `api/admins/admin/staff`
//desc    Create staff
//access  Private
//authorized Route

Router.post('/admin/staff', [
    check('name', 'name is required').not().isEmpty(),
    check('phone', 'phone is required').not().isEmpty(),
    check('address', 'address is required').not().isEmpty(),
    check('isDriver', 'isDriver is required').not().isEmpty(),
    check('agencyName', 'agencyName is required').not().isEmpty(),
    isAdmin
], createStaff);



//@route `api/admins/admin/addbus`
//desc    Create bus
//access  Private
//authorized Route

Router.post('/admin/addbus', [
    check('busName', 'busname is required').not().isEmpty(),
    check('vehicleNo', 'vehicleNo is required').not().isEmpty(),
    check('seats', 'seats is required').not().isEmpty(),
    check('busType', 'busType is required').not().isEmpty(),
    check('seatCategory', 'seatCategory is required').not().isEmpty(),
    check('policy', 'policy is required').not().isEmpty(),
    check('image', 'image is required').not().isEmpty(),
    check('Staff_Number', 'Staff_Number is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),
    check('to', 'to is required').not().isEmpty(),
    check('arrivalTime', 'arrivalTime is required').not().isEmpty(),
    check('departureTime', 'departureTime is required').not().isEmpty(),
    check('schedule', 'schedule is required').not().isEmpty(),
    isAdmin
], addBus);


//@route `api/admins/admin/dashboard`
//desc    getting admin dashboard
//access  Private
//authorized Route

Router.get('/admin/dashboard', isAdmin, AdminDashboard);

module.exports = Router;