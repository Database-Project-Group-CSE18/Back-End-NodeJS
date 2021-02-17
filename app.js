var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Route files
var indexRouter = require('./routes');
var customerRouter = require('./routes/customerRouter');
var sellerRouter = require('./routes/sellerRouter');
var itemRouter = require('./routes/item');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// HTTP request logger middleware for node.js (morgan)
app.use(logger("dev"));

// This is to allow our api for cross-origin resource sharing (To communicate with front end. It is in another server)
app.use(cors());

// This is to allow our api for parsing json
app.use(express.json());

// This is to allow our api to receive data from client app(front end)
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Built in middleware to serve static files such as images, CSS files, and JavaScript files (express.static)
app.use(express.static(path.join(__dirname, "public")));

// Redirect to routes
app.use('/', indexRouter);
app.use('/users', customerRouter);
app.use('/seller', sellerRouter);
app.use('/items', itemRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// This allows us to use this file in anywhere else by importing
module.exports = app;