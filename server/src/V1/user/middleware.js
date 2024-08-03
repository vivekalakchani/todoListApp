const jwt = require('jsonwebtoken')

const config = process.env

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'] // Get token from body, query, or headers

  // Check if token exists
  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY) // Verify token
    req.user = decoded // Save decoded token to request object
  } catch (err) {
    return res.status(401).send('Invalid Token') // If token is invalid, return error
  }
  return next() // If token is valid, continue
}

module.exports = verifyToken
