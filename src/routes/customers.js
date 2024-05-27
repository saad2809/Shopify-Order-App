const express = require('express');
const { fetchCustomers } = require('../services/shopify');

const router = express.Router();

router.get('/', fetchCustomers);

module.exports = router;


