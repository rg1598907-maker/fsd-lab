
const express = require("express");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));

// Set EJS as template engine
app.set("view engine", "ejs");

// Serve static CSS files
app.use(express.static("public"));

// Route 1: Home page (GET)
app.get("/", (req, res) => {
    res.render("index", {
        title: "Express Application",
        message: "Welcome to Express.js"
    });
});

// Route 2: About page (GET)
app.get("/about", (req, res) => {
    res.send("This is About Page");
});

// Route 3: Contact page (GET)
app.get("/contact", (req, res) => {
    res.send("This is Contact Page");
});

// Route 4: Submit form (POST)
app.post("/submit", (req, res) => {
    const name = req.body.name;

    res.send("Hello " + name + ", Form Submitted Successfully!");
});

// Route 5: Services page (GET)
app.get("/services", (req, res) => {
    res.send("Welcome to Our Services Page");
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});