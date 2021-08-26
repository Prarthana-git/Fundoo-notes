const jwt = require('jsonwebtoken');
require('dotenv').config();
/**
 * @description Function to generate token if the credentials passes
 * @returns jwt token
 */
class Helper {
  generateToken (loginInput) {
    const token = jwt.sign({ loginInput }, process.env.TOKEN_GENERATE, {
      expiresIn: '30000s'
    });
    return token;
  }

  verifyToken (req, res, next) {
    const token = req.get('token');
    if (token) {
      jwt.verify(token, process.env.TOKEN_GENERATE, error => {
        if (error) {
          res.status(400).send({ success: false, message: 'Invalid Token' });
        } else {
          next();
        }
      });
    } else {
      return res.status(401).send({ success: false, message: 'Authorisation failed! Invalid user' });
    }
  }

  getEmailFromToken (token) {
    const decoded = jwt.verify(token, process.env.TOKEN_GENERATE);
    return decoded.loginInput.email;
  }
}
module.exports = new Helper();
