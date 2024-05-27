// api/server.js
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const ordersRouter = require('../src/routes/orders');
const customerRouter = require('../src/routes/customers');
const cors = require('cors');

const checkApiKey = require('../src/middleware/apiKeyAuth');


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

app.use(cors(corsOptionsDelegate));

app.use(express.json());
app.use('/api/orders', checkApiKey, ordersRouter);
app.use('/api/customers', checkApiKey, customerRouter);

app.get('/', (req, res) => {
  res.send('App is running..');
});

module.exports = app;
module.exports.handler = serverless(app);
