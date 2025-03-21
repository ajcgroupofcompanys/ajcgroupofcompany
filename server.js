// Import required modules
const express = require('express');
const app = express();
const port = 5000;

// Allow parsing of JSON data in request bodies
app.use(express.json());

// Initial product prices
let prices = {
    "chilly": 10,
    "tomato": 2,
    "spinach": 10,
    "ladies_finger": 2,
    "cabbage": 30,
    "capsicum": 10,
    "cauliflower": 30
};

// Route to get the current prices
app.get('/api/prices', (req, res) => {
    res.json(prices);
});

// Route for admin to update prices
app.post('/api/updatePrices', (req, res) => {
    // For simplicity, this example doesn't include authentication, but in a real app, you would restrict this.
    const newPrices = req.body;
    prices = { ...prices, ...newPrices };  // Update prices with new values
    res.json({ message: "Prices updated successfully", prices });
});

// Serve static files (the HTML page) to users
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${5000}`);
});
