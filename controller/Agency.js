const agency = require('../models/Agency');
const { validation } = require('./Admin');
const Bus = require('../models/Bus');
const staff = require('../models/Staff');

//func for adding a new agency 


const findAgency = async(Name, AgencyName) => {
    const agency = await Name.findOne({ agencyName: AgencyName });
    if (Boolean(agency)) {
        return {
            status: 400,
            errors: "Agency already exists"
        };
    } else {
        return agency;
    }
};

const addAgency = async(req, res, next) => {
    const errors = await validation(req);
    if (errors) {
        return next(errors);
    }
    const { phone, agencyName, headOfficeLocation } = req.body;

    let Agency = await findAgency(agency, agencyName);
    if (Boolean(Agency)) {
        return next(Agency);
    }

    Agency = new agency({
        agent: req.user,
        phone,
        agencyName,
        headOfficeLocation
    });

    await Agency.save();

    res.status(200).json({ msg: "Agency has added successfully" });
};


const deleteAgency = async(req, res, next) => {
    const errors = await validation(req);
    if (errors) {
        return next(errors);
    }
    const { agencyName } = req.body;

    const Agency = await agency.findOne({ agencyName });

    // console.log(Agency);
    if (!Agency) {
        return next({
            status: 400,
            errors: "agency does not exists"
        });
    }

    const Staff = await staff.deleteMany({ agencyId: Agency._id, adminId: req.user });

    const bus = await Bus.deleteMany({ busName: agencyName });
    if (!bus.n) {
        return next({ status: 400, errors: "bus does not exists" });
    }

    await agency.findOneAndDelete({ agencyName });

    res.status(200).json({ msg: "Agency has deleted successfully" });

};


module.exports = { addAgency, deleteAgency };