require('dotenv').config();
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const agency = require('../models/Agency');
const staff = require('../models/Staff');
const bus = require('../models/Bus');
// const config = require('config');

let mySecret = process.env.JWT_SECRET;


// if (config.has('My_Secret_Key')) {
//     mySecret = config.get('My_Secret_Key');
// }


//function for validating the user's input


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

//finding an user by email

const findUser = async(Email) => {

    let Admin = await User.findOne({ email: Email });
    if (Admin) {
        return Admin;
    } else {
        return false;
    }
};

// for checking his password to saved password

const authorization = function(payload, secret = mySecret) {
    const token = Jwt.sign(payload, secret);
    return token;
};



const checkPassword = async(Entered_Password, bcrypted) => {
    const Ispassword = await bcrypt.compare(Entered_Password, bcrypted);
    return Ispassword;
};

//function for creating the admin

const createAdmin = async(req, res, next) => {
    const errors = await validation(req);
    if (errors) {
        return next(errors);
    }

    const { admin_email, name, email, password } = req.body;

    const isAdmin = await User.findOne({ email: admin_email });

    if (!isAdmin || !isAdmin.isAdmin) {
        return next({
            status: 400,
            errors: "You are not an Admin"
        });
    }



    let Admin = await User.findOne({ email: email });

    if (Admin && Admin.isAdmin) {
        return next({
            status: 400,
            errors: "Admin does already exists"
        });
    }


    Admin = new User({
        name,
        email,
        password,
        isAdmin: true
    });


    //bcrypting the passoword

    const salt = await bcrypt.genSalt(10);
    Admin.password = await bcrypt.hash(password, salt);


    await Admin.save();


    //payload

    let payload = {
        id: Admin.id,
        Admin: Admin.isAdmin
    };


    //making a token
    const token = await authorization(payload);
    return res.status(200).json({ token });
};



const logInAdmin = async(req, res, next) => {
    const errors = await validation(req);
    // console.log(errors, "err");
    if (errors) {
        return next(errors);
    }
    // call for find an Admin

    const { email, password } = req.body;

    const Admin = await findUser(email);

    if (Admin === false || !Admin.isAdmin) {
        return next({
            status: 404,
            errors: "User not found"
        });
    }

    //verifying the password of the user

    const password_verification = await checkPassword(password, Admin.password);


    if (password_verification === false) {
        return next({
            status: 400,
            errors: "Incorrect password"
        });
    }

    let payload = {
        id: Admin.id,
        Admin: Admin.isAdmin
    };


    //making a token

    const token = await authorization(payload);
    return res.status(200).json({ token });
};



const AdminDashboard = async(req, res, next) => {

    const agencies = await agency.find({ agent: req.user });
    const staffs = await staff.find({ adminId: req.user });
    const buses = await bus.find({ adminId: req.user });
    console.log(agencies);
    const adminDashboard = {
        agencies: [...agencies],
        buses: [...buses],
        staffs: [...staffs]
    };

    // console.log(adminDashboard, "backend");
    res.status(200).json({ adminDashboard });
};

module.exports = { createAdmin, logInAdmin, validation, checkPassword, AdminDashboard };