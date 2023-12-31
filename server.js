var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const passport = require('passport');



require('dotenv').config();
require('./config/database');
require('./config/passport.js');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const theatersRouter = require('./routes/theaters')
const reviewsRouter = require('./routes/reviews')
const methodOverride = require('method-override');
const Theater = require('./models/theater');
const Review = require('./models/review');
// Use the method-override middleware



var app = express();

// Parse JSON bodies for API endpoints
app.use(express.json());

// Parse URL-encoded bodies for HTML forms
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/theaters', theatersRouter);  
app.use('/reviews', reviewsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; 

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/:id/add-review', (req, res, next) => {
	// res.send('Use this form to add a theater review');
	let targetId = parseInt(req.params.id);
	const target = allTheaters.find((theater) => theater.theaterId === targetId);
	// add this review to the theater
	res.render('theaters/addReview', { theater: target });
	
});


module.exports = app;

