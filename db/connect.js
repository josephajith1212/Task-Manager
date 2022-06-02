const mongoose = require('mongoose');
const connectDB = (url) => {
    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true, //these are to remove the deprecated errors/warnings
        })
}

module.exports = connectDB;