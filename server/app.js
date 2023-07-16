const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const auth = require("./middleware/authentication");
const path = require('path');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv')

process.env.ROOT_PATH = __dirname;
let envPath = './config/dev-config.env';
if (process.env.NODE_ENV === 'production') {
  envPath = './config/prod-config.env';
}
dotenv.config({ path: envPath });

const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const groupsRouter = require('./routes/groups');
const tasksRouter = require('./routes/tasks');
const documentsRouter = require('./routes/documents');
const taskResultsRouter = require('./routes/taskResults');
require('./db/conn');

const app = express();

app.use(express.static(path.join(process.env.ROOT_PATH, '..', 'client', 'dist', 'client')));
app.use('/uploads/userImages', express.static(path.join(process.env.ROOT_PATH, 'uploads', 'userImages')));
app.use('/uploads/projects', express.static(path.join(process.env.ROOT_PATH, 'uploads', 'projects')));
app.use(cors());
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
app.use('/groups', groupsRouter);
app.use('/tasks', tasksRouter);
app.use('/documents', documentsRouter);
app.use('/taskResults', taskResultsRouter);

module.exports = app;
