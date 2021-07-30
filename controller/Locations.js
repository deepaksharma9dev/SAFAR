const locationModel = require('../models/Location');
const { validationResult } = require('express-validator');


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

const findLocation = async(locations, city, state) => {
    const location = await locations.findOne({
        $and: [{ city: city }, { state: state }]
    });
    return location;
};


const AddLocation = async(req, res, next) => {

    const errors = await validation(req);
    if (errors) {
        return next(errors);
    }


    const { city, state } = req.body;
    var isExists;

    await findLocation(locationModel, city, state).then(Location => {
        isExists = Location;
    });
    // console.log(isExists, "isExists");
    if (Boolean(isExists) === true) {
        return next({
            status: 400,
            errors: "Location is already exists"
        });
    }


    let location = new locationModel({
        city,
        state
    });


    await location.save();

    return res.status(200).json({ msg: "location has added successfully" });

};


module.exports = { AddLocation };