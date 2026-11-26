const express = require('express');
const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Product data
let products = [
    { id: 1, name: 'Laptop', price: 50000, rating: 4.5 },
    { id: 2, name: 'Mobile', price: 20000, rating: 4.2 },
    { id: 3, name: 'Headphones', price: 1500, rating: 4.0 }
];

// GET API - Fetch all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// POST API - Add a new product
app.post('/api/products', (req, res) => {
    const { name, price, rating } = req.body;

    if (
        typeof name !== 'string' || !name.trim() ||
        !Number.isFinite(Number(price)) || Number(price) < 0 ||
        !Number.isFinite(Number(rating)) ||
        Number(rating) < 0 || Number(rating) > 5
    ) {
        return res.status(400).json({
            message: 'Please enter valid product details'
        });
    }

    const newProduct = {
        id: products.length > 0
            ? Math.max(...products.map(p => p.id)) + 1
            : 1,
        name: name.trim(),
        price: Number(price),
        rating: Number(rating)
    };

    products.push(newProduct);

    res.status(201).json({
        message: 'Product added successfully',
        product: newProduct
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});