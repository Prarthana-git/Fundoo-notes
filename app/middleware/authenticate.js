const jwt = require('jsonwebtoken')

/**
 * @description Function to generate token if the credentials passes
 * @returns jwt token
 */
exports.generateToken = (data) => {
  return jwt.sign({ data }, process.env.TOKEN_GENERATE,
    { expiresIn: '1h' })
}
