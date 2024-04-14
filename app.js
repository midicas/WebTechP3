// This file is the app file that contains all the middleware and express things.

var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();
//TODO: Handle error

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Set up session
app.use(session({
  secret: 'generate_cookie', //TODO create random generated cookie
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 3600000 // 1 hour sessions
  }
}));

//Logging the username of sessions befor the requests
app.use((req, res, next) => {
  if (req.session.user){
    console.log('--USER: ' + req.session.user)
  }
  else{
    console.log('--USER is unregistered')
  }
  next();
})

//Set up routers
app.use('/', indexRouter);
app.use('/users', usersRouter);


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
  res.render('error', {pageTitle : 'Error'});
});


module.exports = app;
