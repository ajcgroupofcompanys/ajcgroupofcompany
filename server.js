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
const API_BASE_URL = '';

async function fetchAndRenderOrders() {
  const month = document.getElementById('filterMonth').value;
  const year = document.getElementById('filterYear').value;
  let url = `${API_BASE_URL}/api/orders`;
  const params = [];
  if (month) params.push(`month=${month}`);
  if (year) params.push(`year=${year}`);
  if (params.length) url += '?' + params.join('&');

  const res = await fetch(url, { credentials: 'include' });
  const orders = await res.json();

  renderOrdersTable(orders);
  renderOrderStats(orders);
}

function renderOrdersTable(orders) {
  const tbody = document.getElementById('ordersTable').querySelector('tbody');
  tbody.innerHTML = '';
  orders.forEach(order => {
    const date = new Date(order.date).toLocaleString();
    const items = order.items.map(i => `${i.product} (${i.quantity})`).join(', ');
    tbody.innerHTML += `<tr>
      <td>${date}</td>
      <td>${order.orderNumber}</td>
      <td>${items}</td>
      <td>₹${order.totalAmount}</td>
    </tr>`;
  });
}

function renderOrderStats(orders) {
  const statsDiv = document.getElementById('ordersStats');
  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  statsDiv.innerHTML = `
    <p>Total Orders: ${totalOrders}</p>
    <p>Total Amount: ₹${totalAmount}</p>
  `;
}

// Call on page load
fetchAndRenderOrders();
