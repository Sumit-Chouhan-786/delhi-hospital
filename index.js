// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const app = express();

// Define the port
const port = process.env.PORT || 5000;

// Connect to the MongoDB database
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });

// Middleware for parsing form data and JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware for handling sessions
app.use(
  session({
    secret: process.env.SECRET_KEY || "defaultsecretkey", // Use a fallback secret key if not in .env
    saveUninitialized: true,
    resave: false,
  })
);

// Middleware to handle flash messages
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files (e.g., uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set EJS as the template engine
app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs");

const methodOverride = require('method-override');
app.use(methodOverride('_method')); // This allows the form to submit a PATCH request.


app.use("/", require("./routes/userRoutes")); 
app.use("/admin", require("./routes/adminRoutes")); 

// Catch-all route for undefined routes (404 error page)
app.all("*", (req, res) => {
  res.render("ui/404", { title: "Delhi Hospital" }); // Render 404.ejs for any other undefined route
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
