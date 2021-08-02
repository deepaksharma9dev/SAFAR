// const config = require('config');
require('dotenv').config();
const mongoose = require('mongoose');
let db = process.env.MONGO_URL;
console.log(db);

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