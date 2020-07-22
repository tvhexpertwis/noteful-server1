/*******************************************************************
  IMPORTS
*******************************************************************/
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const validateBearerToken = require('./bin/validateBearerToken');
const errorHandler = require('./bin/errorHandler');
const foldersRouter = require('./folders-router');
const notesRouter = require('./notes-router');

/*******************************************************************
  INIT
*******************************************************************/
const app = express();

/*******************************************************************
  MIDDLEWARE
*******************************************************************/
app.use(morgan(NODE_ENV === 'production' ? 'tiny' : 'common'));
app.use(cors());
app.use(helmet());
// app.use(express.json());
// app.use(validateBearerToken);

/*******************************************************************
  ROUTES
*******************************************************************/
app.get('/', (req, res) => {
  return res.status(200).end();
});

app.use('/api/folders', foldersRouter);
app.use('/api/notes', notesRouter);

/*******************************************************************
  ERROR HANDLING
*******************************************************************/
// Catch-all 404 handler
app.use((req, res, next) => {
  const err = new Error('Path Not Found');
  err.status = 404;
  next(err); // goes to errorHandler
});
app.use(errorHandler);

/*******************************************************************
  EXPORTS
*******************************************************************/
module.exports = app;
