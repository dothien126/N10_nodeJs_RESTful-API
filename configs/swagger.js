const {PORT} = require('./index')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'RESTful API',
      version: '2.0.0',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        environment: 'Development server',
      },
    ],
  },
  apis: ['server/api/**/**.route.js'],
};

module.exports = swaggerOptions;
