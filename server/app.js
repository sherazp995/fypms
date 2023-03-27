var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const auth = require("./middleware/authentication");
require('dotenv').config({ path: './config/config.env' });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/projects');
const mongoose = require('./db/conn');

var app = express();

app.use(auth);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

module.exports = app;
