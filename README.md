# Shopify Orders App

This Node.js Express application fetches orders, customers and specific order by id from a Shopify store using Shopify's Admin API and provides endpoints to retrieve all orders or a specific order by its ID.

## Installation

1. Clone the repository:

```bash
git clone git@github.com:C2Digital1/Hearty-Cajun-Order-Admin-API.git 
```


2. Navigate to the project directory:

```bash
cd Shopify-Order-Admin-API-Node-Express-App
```
# Usage 🚀

1. Set up your environment variables:
** Create a .env file in the root directory of the project and add the following variables: **

```bash
SHOPIFY_STORE_URL=your-shopify-store-url
SHOPIFY_ACCESS_TOKEN=your-shopify-access-token
API_VERSION=your-shopify-api-version
```
2. Start the server:

```bash
npm start
```
The server will start running on [http://localhost:3000/](http://localhost:3000/)

3. Add Allowed Domains/Origins inside app.js file in variable [allowlist] same like following code:

```bash
const allowlist = ['https://domain1.com', 'https://domain2.com'];
```
**Note: It will work for localhost.**

# Endpoints 📝

+ GET /api/orders: Fetch all orders from the Shopify store.
+ GET /api/orders/122222: Fetch a specific order by its ID.
+ GET /api/customers: Fetch all customers

# Environment Variables 🌐

+ `SHOPIFY_STORE_URL:` The URL of your Shopify store.
+ `SHOPIFY_ACCESS_TOKEN:` Your Shopify store's access token you can get by creating app in shopif app sales channel for more info visit [Shooify Custom Apps](https://help.shopify.com/en/manual/apps/app-types/custom-apps)
+ `API_VERSION:` The version of the Shopify Admin API to use.

# Contributing 🤝

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull reques

Code by Saad-C2 [saad.sajid@c2-digital.com](saad.sajid@c2-digital.com) 👨‍💻
+ Fork the repository.
+ Create your feature branch:

```bash
git checkout -b feature/my-feature
```
+ Commit your changes:

```bash
git commit -am 'Add my feature'
```

+ Push to the branch:

```bash
git push origin feature/my-feature
```

+ Submit a pull request.

```bash
git push origin feature/my-feature
```
# License 📄

You can copy and paste this Markdown code directly into your README.md file in your GitHub repository. Feel free to customize it further if needed!