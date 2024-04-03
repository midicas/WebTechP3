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

app.use(logger('dev'));
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

app.use((req, res, next) => {
  console.log(req.session);
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

function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next(); // User is authenticated, continue to the next middleware
  }
  // User is not authenticated, redirect to login page
  res.redirect('/users/login');
}


module.exports = app;
