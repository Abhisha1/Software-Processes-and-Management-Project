const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
var whitelist = ['http://localhost:3000', 'https://jjfresh.netlify.app/']

var options = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With"
}

// app.use(cors(options))
app.use(cors({credentials: true, origin: '*'}));
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