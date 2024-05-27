const express = require('express');
const cors = require('cors');
const ordersRouter = require('./routes/orders');
const customerRouter = require('./routes/customers');

const app = express();

const allowlist = ['https://heartycajun.com', 'https://6a5476-3.myshopify.com', 'http://127.0.0.1:9292'];


var corsOptionsDelegate = function (req, callback) {
    const origin = req.header('Origin');
    console.log('Request from origin:', origin); // Log the origin to console
    const isAllowed = allowlist.includes(origin);
    const corsOptions = {
        origin: isAllowed,
    };
    console.log('Origin is allowed', isAllowed);
    callback(null, corsOptions); // callback expects two parameters: error and options
};

// Use cors middleware with options
app.use(cors(corsOptionsDelegate)); 

// Use routes
app.use('/api/orders', ordersRouter);
app.use('/api/customers', customerRouter);

module.exports = app;
