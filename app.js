var createError = require('http-errors');

var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var deshboardRouter = require('./routes/deshboard');
var addNewCatRouter = require('./routes/addNewCategory');
var passCatRouter = require('./routes/passCategory');
var addPappRouter = require('./routes/addNewPassword');
var viewAllpassRouter = require('./routes/viewAllPassword');
var singupRouter = require('./routes/singup');
var usersRouter = require('./routes/users');
// API
var addCatRouterApi = require('./api/addNewCat');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/deshboard',deshboardRouter);
app.use('/addNewCategory',addNewCatRouter);
app.use('/passCategory',passCatRouter);
app.use('/addNewPasseor',addPappRouter);
app.use('/viewAllPassword',viewAllpassRouter);
app.use('/singup',singupRouter);
app.use('/users', usersRouter);
// api
app.use('/api', addCatRouterApi);


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
