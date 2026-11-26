const express = require('express');
const app = express();

const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Temporary product data
let products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000,
        description: "HP Laptop with 8GB RAM"
    },
    {
        id: 2,
        name: "Mobile",
        price: 20000,
        description: "Samsung Smartphone"
    },
    {
        id: 3,
        name: "Headphones",
        price: 1500,
        description: "Wireless Bluetooth Headphones"
    }
];

// 1. GET - Display all products
app.get('/products', (req, res) => {
    res.json(products);
});

// 2. GET - Display a single product
app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

// 3. POST - Add a new product
app.post('/products', (req, res) => {
    const { name, price, description } = req.body;

    if (!name || price === undefined || !description ||
        typeof name !== 'string' ||
        !Number.isFinite(Number(price)) ||
        Number(price) < 0 ||
        typeof description !== 'string') {
        return res.status(400).json({
            message: "Please provide valid product details"
        });
    }

    const newProduct = {
        id: products.length > 0
            ? Math.max(...products.map(p => p.id)) + 1
            : 1,
        name,
        price: Number(price),
        description
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});

// 4. PUT - Update an existing product
app.put('/products/:id', (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, price, description } = req.body;

    if (!name || price === undefined || !description ||
        typeof name !== 'string' ||
        !Number.isFinite(Number(price)) ||
        Number(price) < 0 ||
        typeof description !== 'string') {
        return res.status(400).json({
            message: "Please provide valid product details"
        });
    }

    product.name = name;
    product.price = Number(price);
    product.description = description;

    res.json({
        message: "Product updated successfully",
        product
    });
});

// 5. DELETE - Delete a product
app.delete('/products/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(index, 1);

    res.json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})