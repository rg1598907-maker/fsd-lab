const express = require('express');
const app = express();

const PORT = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Temporary student data
let students = [
    { name: 'Rahul', course: 'MCA' },
    { name: 'Aman', course: 'BCA' }
];

// ROUTE 1: Home page (GET)
app.get('/', (req, res) => {
    res.render('index');
});

// ROUTE 2: About page (GET)
app.get('/about', (req, res) => {
    res.render('about');
});

// ROUTE 3: Contact page (GET)
app.get('/contact', (req, res) => {
    res.render('contact');
});

// ROUTE 4: Contact form submission (POST)
app.post('/contact', (req, res) => {
    const name = req.body.name;
    const message = req.body.message;

    res.render('success', { name, message });
});

// ROUTE 5: Display students (GET)
app.get('/students', (req, res) => {
    res.render('students', { students });
});

// ROUTE 6: Add student (POST)
app.post('/students', (req, res) => {
    const { name, course } = req.body;

    students.push({ name, course });

    res.redirect('/students');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});