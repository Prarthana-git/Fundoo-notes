
/* eslint-disable no-sequences */
const userModel = require('../models/user');
const help = require('../middleware/helper');
const bcrypt = require('bcrypt');
const logger = require('../../config/loggers');
const sendEmail = require('../../Utility/nodemailer');
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
            const token = help.generateToken(loginInfo);
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

  forgotPassword (email, callback) {
    try {
      let link;
      let newToken;
      userModel.forgotPass(email, (error, data) => {
        if (error) {
          logger.error('Some error occured', error);
          callback(error, null);
        } else {
          newToken = help.forgotPasswordToken(data);
        }
        link = `${process.env.CLlENTURL}${newToken}`;
        sendEmail(data.email, 'Password Reset Link ', link);
        callback(null, link);
        logger.info('Password reset link send successfully', data);
      });
    } catch (error) {
      return callback(error, null);
    }
  }

  passwordReset (userInput, callback) {
    const email = help.getEmailFromToken(userInput.token);
    const inputData = {
      email: email,
      password: userInput.password
    };

    userModel.updatePassword(inputData, (error, data) => {
      if (error) {
        logger.error('Some error occured while updating password', error);
        callback(error, null);
      } else {
        callback(null, data);
      }
    });
  }
}
module.exports = new UserService();
