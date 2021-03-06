const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT;


app.use(cors());
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
const ordersRouter = require('./routes/orders');
const adminRouter = require('./routes/admins');

app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/admin', adminRouter);

// Passively listen on specified port
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});