const Service = require('./service')

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  try {
    const response = await Service.registerData(
      firstName,
      lastName,
      email,
      password,
    )
    res.status(201).json(response)
  } catch (error) {
    console.error(error.message)
    res.status(400).send(error.message)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await Service.loginData(email, password)
    res.status(200).json(user)
  } catch (error) {
    console.error(error.message)
    res.status(400).send(error.message)
  }
}

module.exports = {
  register,
  login,
}
