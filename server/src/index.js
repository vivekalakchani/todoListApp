const express = require('express')
const app = express()
const BodyParser = require('body-parser')
const cors = require('cors')
const swaggerSetup = require('./swagger')
require('dotenv').config()
require('../db/conn') // Ensure this path is correct

// Import route handlers

const userRoutes = require('./V1/user/router')
const todoListRoutes = require('./V1/todoList/router')

// CORS setup
const allowedOrigins = 'http://localhost:3000'
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
  }),
)

// Parse application/json
app.use(BodyParser.json())

// Register routes

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/todoList', todoListRoutes)
swaggerSetup(app)
module.exports = app
