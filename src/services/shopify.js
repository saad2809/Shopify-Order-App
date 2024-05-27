const axios = require('axios');
require('dotenv').config();

// Environment variables
const { SHOPIFY_STORE_URL, SHOPIFY_ACCESS_TOKEN, API_VERSION } = process.env;

async function fetchOrders(req, res) {
    console.log('Received request to fetch orders');
    const url = `https://${SHOPIFY_STORE_URL}/admin/api/${API_VERSION}/orders.json?status=any`;
    let allOrders = [];

    try {
        let nextPageUrl = url;

        while (nextPageUrl) {
            const response = await axios.get(nextPageUrl, {
                headers: {
                    'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
                },
            });

            const orders = response.data.orders.map(order => {
                const shippingNoteAttribute = order.note_attributes.find(attribute => attribute.name === 'Shipping-Date');
                const shippingDate = shippingNoteAttribute ? shippingNoteAttribute.value : 'N/A';

                return {
                    id: order.id,
                    orderGraphQlId: order.admin_graphql_api_id,
                    name: order.name,
                    createdDate: order.created_at,
                    totalPrice: order.total_price,
                    priceCurrency: order.currency,
                    customer: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'Guest',
                    shippingDate,
                };
            });

            allOrders = allOrders.concat(orders);

            nextPageUrl = getNextPageUrl(response.headers.link);
        }

        console.log('Processed orders:', allOrders);
        res.json(allOrders);
    } catch (error) {
        console.error('Error fetching orders:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
}

function getNextPageUrl(linkHeader) {
    if (!linkHeader) return null;

    const links = linkHeader.split(', ');

    for (const link of links) {
        const [url, rel] = link.split('; ');

        if (rel.includes('rel="next"')) {
            return url.slice(1, -1); // Remove surrounding angle brackets
        }
    }

    return null;
}

// get sepecific order by id
async function fetchOrderById(req, res) {
    const { orderId } = req.params; // Retrieve orderId from request parameters
    const url = `https://${SHOPIFY_STORE_URL}/admin/api/${API_VERSION}/orders/${orderId}.json`;

    try {
        const response = await axios.get(url, {
            headers: {
                'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
            },
        });
        
        const order = response.data.order;
        const shippingNoteAttribute = order.note_attributes.find(attribute => attribute.name === 'Shipping-Date');
        const shippingDate = shippingNoteAttribute ? shippingNoteAttribute.value : 'N/A';

        const formattedOrder = {
            id: order.id,
            orderGraphQlId: order.admin_graphql_api_id,
            name: order.name,
            createdDate: order.created_at,
            totalPrice: order.total_price,
            priceCurrency: order.currency,
            customer: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'Guest',
            shippingDate,
        };

        res.json(formattedOrder);
    } catch (error) {
        console.error(`Error fetching order with ID ${orderId}:`, error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
}


// get all customers 
async function fetchCustomers(req, res) {
    console.log('Received request to fetch customers');
    const url = `https://${SHOPIFY_STORE_URL}/admin/api/${API_VERSION}/customers.json?status=any`;
    let allcustomers = [];

    try {
        let nextPageUrl = url;

        while (nextPageUrl) {
            const response = await axios.get(nextPageUrl, {
                headers: {
                    'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
                },
            });

            const customers = response.data.customers;

            allcustomers = allcustomers.concat(customers);

            nextPageUrl = getNextPageUrl(response.headers.link);
        }

        console.log('Processed customers:', allcustomers);
        res.json(allcustomers);
    } catch (error) {
        console.error('Error fetching customers:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
}

module.exports = { fetchOrders, fetchOrderById, fetchCustomers };
