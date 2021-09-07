const root = require('./root');
var path = require('path');

/**
 * Setup environment
 */
require('dotenv').config();

/**
 * Setup database
 */
require('./config/mongoose');

/**
 * Setup passport authentication
 */
require('./config/passport');

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const AuthRouter = require('./routes/auth');
const AttendanceRouter = require('./routes/attendance');
const { appErrorHandler } = require('./config/app');
const StudentRouter = require('./routes/student');

var app = express();

/**
 * Enable cors
 */
app.use(require('cors')({
  origin: 'http://localhost:4200',
  credentials: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Authentication
 */
app.use('/api/v1/auth', AuthRouter);

/**
 * Student 
 */
app.use('/api/v1/student', StudentRouter);

/**
/**
 * Attedance
 */
app.use('/api/v1/attendance', AttendanceRouter);

/**
 * Catch errors
 */
app.use(appErrorHandler);

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
