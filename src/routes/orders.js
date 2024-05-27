const express = require('express');
const { fetchOrders, fetchOrderById } = require('../services/shopify');

const router = express.Router();

router.get('/', fetchOrders);

router.get('/:orderId', fetchOrderById);

module.exports = router;