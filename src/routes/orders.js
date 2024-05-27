const express = require('express');
const { fetchOrders, fetchOrderById } = require('../services/shopify');

const router = express.Router();

// Handle GET request for fetching orders
router.post('/', fetchOrders);

// Handle POST request for fetching a specific order
router.post('/:orderId', fetchOrderById); // Assuming orderId is sent in the request body

module.exports = router;
