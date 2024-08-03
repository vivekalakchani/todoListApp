const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Counter = require('./counter')
const User = require('./UserSchema')

require('dotenv').config()

const registerData = async (firstName, lastName, email, password) => {
  // Input validation should ideally be handled in the controller
  if (!(email && password && firstName && lastName)) {
    throw new Error('All input is required')
  }

  // Check if user already exists
  const oldUser = await User.findOne({ email })

  if (oldUser) {
    throw new Error('User Already Exists. Please Login')
  }

  // Encrypt user password
  const encryptedPassword = await bcrypt.hash(password, 10)

  // Create user in the database
  const trSeq = await Counter.getNextSequence()
  const user = await User.create({
    userId: `UID_${trSeq}`,
    firstName,
    lastName,
    email: email.toLowerCase(),
    password: encryptedPassword,
  })

  // Create token
  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: '2h',
  })

  return { user, token }
}

const loginData = async (email, password) => {
  // Input validation should ideally be handled in the controller
  if (!(email && password)) {
    throw new Error('All input is required')
  }

  // Find user in the database
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h',
      },
    )

    // Save user token
    user.token = token
    return user
  }

  throw new Error('Invalid Credentials')
}

module.exports = {
  registerData,
  loginData,
}
