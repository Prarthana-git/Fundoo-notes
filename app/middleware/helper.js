const jwt = require('jsonwebtoken');

/**
 * @description Function to generate token if the credentials passes
 * @returns jwt token
 */
class Helper {
  generateToken (data) {
    return jwt.sign({ data }, process.env.TOKEN_GENERATE,
      { expiresIn: '1h' });
  };

  forgotPasswordToken (loginInput) {
    const token = jwt.sign({ loginInput }, process.env.TOKEN_GENERATE,
      { expiresIn: '3000s' });
    return token;
  }
}
module.exports = new Helper();
