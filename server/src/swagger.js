const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const express = require('express')

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Todo API',
    version: '1.0.0',
    description: 'A simple API for managing todos and users',
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Local server',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['./V1/todoList/router.js', '/V1/user/router.js'],
}

const swaggerSpec = swaggerJsdoc(options)

const swaggerSetup = (app) => {
  // Serve Swagger docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

module.exports = swaggerSetup
