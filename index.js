require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();
const db = require('./Config/db');

//routes
const Admin = require('./routers/Admin');
const User = require('./routers/User');
const Bus = require('./routers/Buses');
const auth = require('./routers/auth');


// db connection
db.connect_db();

app.use(express.json());
app.use(cors());

//routes callings
app.use('/api/admins', Admin);
app.use('/api/users', User);
app.use('/api/buses', Bus);
app.use('/api/user/auth', auth);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname.anchor, 'frontend', 'build', 'index.html'));
    });
}


app.use((err, req, res, next) => {
    console.log(err);
    console.log("err handler is working");
    if (err.hasOwnProperty("status")) {
        return res.status(err.status).json({ errors: err.errors });
    } else {
        return err;
    }

});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});


// module.exports = app;