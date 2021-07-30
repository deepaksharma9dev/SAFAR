const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();

//connect with in memory database

const connect = async() => {
    try {

        const uri = await mongod.getUri();

        const mongooseOpts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        };
        await mongoose.connect(uri, mongooseOpts);
        console.log("in Memory database has connected");
    } catch (err) {
        await mongod.stop();
        console.err(err);
    }
};




//disconnect and close connection 

const closeDatabase = async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};


// // clear the db, remove all data

const clearDatabase = async() => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};


module.exports = { connect, closeDatabase, clearDatabase };