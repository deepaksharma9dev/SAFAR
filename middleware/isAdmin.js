const User = require('../models/User');
const { authentication } = require('../controller/User');
const jwt = require('jsonwebtoken');

module.exports = async(req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const decoded = await authentication(token);

    try {
        const decoded = await authentication(token);
        req.user = decoded.id;
        req.Admin = decoded.Admin;
        if (req.Admin === true) {
            return next();
        } else {
            return next({
                status: 400,
                errors: "You are not an admin"
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(401).json({ msg: "Token is not valid" });
    }
};