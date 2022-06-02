const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const tasks = require('./routes/tasks');
require('dotenv').config();

//Middleware
app.use(express.json());

//Routes
app.get('/hello', (req, res) => {
    res.end(`Task Manager App`);
})

app.use('/api/v1/tasks', tasks);

const port = 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        console.log('DB connected')
        app.listen(port, console.log(`Server is up and running at http://localhost:${port}`))
    }
    catch (err) {console.log(err)};
}
start();