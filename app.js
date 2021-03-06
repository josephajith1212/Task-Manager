const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const tasks = require('./routes/tasks');
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config();

//Middleware
app.use(express.static('./public'))
app.use(express.json());

//Routes
app.use('/api/v1/tasks', tasks);
app.use(notFound)
app.use(errorHandler)

//establish DB connection before starting server
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        console.log('DB connected')
        app.listen(port, console.log(`Server is up and running at http://localhost:${port}`))
    }
    catch (err) {console.log(err)};
}
start();