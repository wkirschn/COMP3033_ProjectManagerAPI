var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import mongoose and globals
const mongoose = require('mongoose');
const config = require('./config/globals');


// Web App Endpoint

var indexRouter = require('./routes/index');

// API Endpoint

const projectsRouter = require('./routes/api/projects');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// enable endpoint

app.use('/api/projects', projectsRouter);

// Connect to mongo db after the router configuration

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}).then((message) => {
  console.log('Successfully connected to MongoDB!');
})
.catch((error) => {
  console.log('Error in connecting to MongoDB! ${error}' );
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
