const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authentication } = require('../controller/User');

module.exports = async(req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        const decoded = await authentication(token);
        req.user = decoded.id;
        req.Admin = decoded.Admin;
        if (req.Admin === false || req.Admin === true) {
            return next();
        } else {
            return next({
                status: 400,
                errors: "Invalid user"
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(401).json({ msg: "Token is not valid" });
    }
};