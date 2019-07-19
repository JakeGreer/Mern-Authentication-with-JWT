const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
/*Added*/
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const contentLength = require('express-content-length-validator');
const rateLimit = require("express-rate-limit");
//Config
const KEYS = require("./config/keys");
const users = require("./routes/api/users");

const PORT = process.env.PORT || KEYS.PORT;

const app = express();
app.disable('x-powered-by');


// tell the app to look for static files in these directories
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// CORS
app.use(cors()); // Must be before BodyParser**

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//Helps protect against server detection
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))

//Helps protect against DOS attacks
app.use(contentLength.validateMax({max: process.env.MAX_CONTENT_LENGTH_ACCEPTED, status: 400, message: "stop it!"})); // max size accepted for the content-length

//Helps protect against HPP attacks
app.use(hpp()); //after body parser

// DB Config
const db = KEYS.mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

//Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
//see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
 //apply to all requests
app.use(apiLimiter);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});