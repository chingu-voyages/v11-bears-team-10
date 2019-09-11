require("./db")

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const projectRouter = require('./routes/project')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/project', projectRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({error: 'Route Not Found'})
});

// error handler
app.use(function(err, req, res, next) {
 res.status(500).json({error: 'Internal Server Error'})
});

module.exports = app;
