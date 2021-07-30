// require('dotenv').config();
const config = require('config');
const mongoose = require('mongoose');
const db = config.get("mongoURL");
module.exports.connect_db = async() => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("database has connected successfully");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }

};
// console.log(db);