const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const auth = require("./middleware/authentication");
const path = require('path');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv')

let envPath = './config/dev-config.env';
if (process.env.NODE_ENV === 'production') {
  envPath = './config/prod-config.env';
}
dotenv.config({ path: envPath });

const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const groupsRouter = require('./routes/groups');
require('./db/conn');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'dist', 'client')));
app.use('/uploads/userImages', express.static(path.join(__dirname, 'uploads', 'userImages')));
app.use('/uploads/projects', express.static(path.join(__dirname, 'uploads', 'projects')));
app.use(cors('*'));
app.use(auth);
app.use(fileUpload({
  createParentPath: true,
  preserveExtension: true
}));
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/groups', groupsRouter)

module.exports = app;
