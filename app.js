const bodyParser = require('body-parser');
const express = require('express');
const { StatusCodes } = require('http-status-codes');
const logger = require('morgan');
const res = require('express/lib/response');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// config env
require('dotenv').config();

// import routes
const userRoutes = require('./server/api/user/user.route');
const authRoutes = require('./server/api/auth/auth.route');

// import config
const dbConfig = require('./configs/db.connect');
const swaggerOptions = require('./configs/swagger');

// import error handler middleware
const { errorHandler } = require('./server/helper/APIError');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();

// connect to mongodb
dbConfig();

// use middle ware
app.use(bodyParser.json());
app.use(logger('dev'));

// routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/users', userRoutes);
app.use('/users', authRoutes);

// catch route error
app.use('*', (req, res, next) => {
  const err = new Error('Not Found');
  err.status = StatusCodes.NOT_FOUND;
  next(err);
});

// handler error middleware
app.use(errorHandler);

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = server;
