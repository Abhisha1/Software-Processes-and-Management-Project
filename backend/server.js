const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

var allowedOrigins = ['http://localhost:3000', 'https://jjfresh.netlify.app/'];
let origin = req.headers.origin;
if (allowedOrigins.indexOf(origin) > -1){
    app.use(cors({credentials: true, origin: origin}));
}
app.use(cookieParser());
app.use(express.json());

// Establish connection to MongoDB Atlas cluster
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { userNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})

// Set routers
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Passively listen on specified port
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});