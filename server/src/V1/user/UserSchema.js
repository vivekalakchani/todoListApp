const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: [true, 'A User must have a first name'],
      default: null,
    },
    lastName: {
      type: String,
      required: [true, 'A User must have a last name'],
      default: null,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

const User = mongoose.model('User', userSchema)

module.exports = User
