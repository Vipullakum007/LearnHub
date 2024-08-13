const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection sucessfull")
    } catch (error) {
        console.log('database connection error: ', error.message);
        process.exit(0);
    }
};

module.exports = connectDB;