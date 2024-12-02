// imports important things
require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")

const app = express()

const port = process.env.port || 4000;

// Connect to the database
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true, // Correct spelling of `useNewUrlParser`
    useUnifiedTopology: true, // Recommended for modern MongoDB connections
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Access the database connection
const db = mongoose.connection;

// Log error events from the connection
db.on("error", (error) => {
  console.error("Database error:", error);
});

// Log a message when the connection is successfully opened
db.once("open", () => {
  console.log("Database connection is open");
});

// database connection end

// middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(
  session({
    secret: process.env.secretKey,
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req,res,next)=>{
res.locals.message= req.session.message;
delete req.session.message;
next()
})

app.use(express.static("uploads"))

// set template engin

app.set("view engin","ejs")


// route prefix

app.use("",require('./routes/routes'))

app.listen(port,()=>{
    console.log(`server is running ${port}`);
})