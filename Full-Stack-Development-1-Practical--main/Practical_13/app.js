const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
    secret: 'ecommerce-secret',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});

// Home page
app.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
});

// Add product to cart
app.post('/cart/add/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).send('Product not found');
    }

    const item = req.session.cart.find(
        p => p.productId === product.id
    );

    if (item) {
        item.quantity++;
    } else {
        req.session.cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    res.redirect('/cart');
});

// View cart
app.get('/cart', (req, res) => {
    const cart = req.session.cart;
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    res.render('cart', { cart, total });
});

// Remove item from cart
app.post('/cart/remove/:id', (req, res) => {
    req.session.cart = req.session.cart.filter(
        item => item.productId !== req.params.id
    );

    res.redirect('/cart');
});

// Checkout page
app.get('/checkout', (req, res) => {
    res.render('checkout');
});

// Place order using demo payment
app.post('/checkout', async (req, res) => {
    const cart = req.session.cart;

    if (cart.length === 0) {
        return res.send('Your cart is empty');
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const order = new Order({
        products: cart,
        totalAmount: total,
        customerName: req.body.customerName,
        paymentStatus: 'Paid (Demo)'
    });

    await order.save();

    req.session.cart = [];

    res.send('Order placed successfully! Demo payment completed.');
});

// View orders
app.get('/orders', async (req, res) => {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.render('orders', { orders });
});

// Admin panel
app.get('/admin', async (req, res) => {
    const products = await Product.find();
    const orders = await Order.find().sort({ orderDate: -1 });

    res.render('admin', { products, orders });
});

// Add product
app.post('/admin/add', async (req, res) => {
    await Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image
    });

    res.redirect('/admin');
});

// Delete product
app.post('/admin/delete/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
});

// Start server after MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Practical13')
    .then(() => {
        console.log('MongoDB Connected Successfully');

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.log('MongoDB Connection Error:', error);
    });