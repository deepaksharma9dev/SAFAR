const isVerify = require('../middleware/isVerify');
const Router = require('express').Router();
const { authuser, isBooked } = require('../controller/auth');



Router.get('/authuser', isVerify, authuser);

Router.get('/isBooked/:busId', isBooked);

module.exports = Router;