const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'RESTful API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5050',
        description: 'Development server',
      },
    ],
  },
  apis: ['app.js'],
};

module.exports = { swaggerOptions };
