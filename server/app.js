const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const auth = require("./middleware/authentication");
const path = require('path');
require('dotenv').config({ path: './config/config.env' });

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
require('./db/conn');

const app = express();

app.use('/uploads/userImages', express.static(path.join(__dirname, 'uploads', 'userImages')));
app.use('/uploads/projects', express.static(path.join(__dirname, 'uploads', 'projects')));
app.use(cors('*'));
app.use(auth);
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

module.exports = app;
