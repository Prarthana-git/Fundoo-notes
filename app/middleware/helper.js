const jwt = require('jsonwebtoken');
require('dotenv').config();
/**
 * @description Function to generate token if the credentials passes
 * @returns jwt token
 */
class Helper {
  generateToken (loginInput) {
    const token = jwt.sign({ loginInput }, process.env.TOKEN_GENERATE, {
      expiresIn: '3000s'
    });
    return token;
  }

  getEmailFromToken (token) {
    const decoded = jwt.verify(token, process.env.TOKEN_GENERATE);
    return decoded.email;
  }
}
module.exports = new Helper();
