const { check, validationResult } = require('express-validator');
const Staff = require('../models/Staff');
const agency = require('../models/Agency');

//searching a staff



const findStaff = async(staffmodel, StaffNumber) => {
    const staff = await staffmodel.findOne({ phone: StaffNumber });
    if (Boolean(staff)) {
        return {
            status: 400,
            errors: "staff already exists"
        };
    } else {
        return staff;
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

const createStaff = async(req, res, next) => {
    const errors = await validation(req);
    if (errors) {
        return next(errors);
    }

    const { name, phone, address, isDriver, agencyName } = req.body;

    if (typeof(isDriver) !== 'boolean') {
        return next({
            status: 400,
            errors: "Invalid input"
        });
    }

    let staff = await findStaff(Staff, phone);

    if (Boolean(staff)) {
        return next(staff);
    }
    const Agency = await agency.findOne({ agencyName });

    // console.log(Agency, "agency");

    if (!Agency) {
        return next({
            status: 404,
            errors: "Agency is not found"
        });
    }
    console.log("Agency", Agency);
    staff = new Staff({
        adminId: req.user,
        name,
        phone,
        address,
        isDriver,
        agencyId: Agency._id
    });

    // console.log("stafffile", staff);
    await staff.save();

    return res.status(200).json({ msg: "staff has added successfully" });
    // res.json({ msg: "staff has added successfully" });

};


module.exports = { createStaff };