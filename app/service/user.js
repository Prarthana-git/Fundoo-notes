const userModel = require('../models/user');
const auth = require('../middleware/helper');
const bcrypt = require('bcrypt');
const logger = require('../../config/loggers');
class UserService {
  registerUser (user, callback) {
    userModel.registerUser(user, (err, data) => {
      if (err) {
        logger.error('Error while creating new user', err);
        callback(err, null);
      } else {
        logger.info('User registered successfully!', data);
        callback(null, data);
      }
    });
  };

  /**
   * @description     : it acts as a midlleware for models and controllers
   * @param           : data, callback
   * @method          : login from models
  */
  loginUser (loginInfo, callback) {
    userModel.loginUser(loginInfo, (err, data) => {
      if (data) {
        bcrypt.compare(loginInfo.password, data.password, (err, data) => {
          if (err) {
            logger.error('Error while trying to login the user', err);
            callback(err, null);
          }
          if (data) {
            logger.info('logged in successfully', data);
            const token = auth.generateToken(loginInfo);
            return callback(null, token);
          } else {
            logger.error('Please enter correct password', err);
            callback(new Error('Password does not match'));
          }
        });
      } else {
        logger.error('Error while trying to login the user', err);
        callback(err, null);
      }
    });
  }
}

module.exports = new UserService();
