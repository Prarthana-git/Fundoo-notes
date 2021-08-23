const userService = require('../service/user');
const auth = require('../middleware/helper');
const { authRegister, authLogin, forgotPasswordValidation, resetPasswordValidation } = require('../middleware/validation');
const logger = require('../../config/loggers');
/**
 * @description    : This class has two methods to create and login of user
 * @methods        : create, login and forgotPassword
*/
class Controller {
  register (req, res) {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      };
      const registerValidation = authRegister.validate(user);

      if (registerValidation.error) {
        res.status(400).send({
          success: false,
          message: 'Please Enter Valid Fields',
          data: registerValidation
        });
        return;
      }
      userService.registerUser(user, (error, data) => {
        if (error) {
          logger.error('Error while creating user');
          return res.status(409).json({
            success: false,
            message: 'User already exist'
          });
        } else {
          logger.info('User created successfully', data);
          return res.status(201).json({
            success: true,
            message: 'User Registered',
            data: data
          });
        }
      });
    } catch (error) {
      logger.error('Internal server error while registering new user', error);
      return res.status(500).json({
        success: false,
        message: 'Error While Registering',
        data: null
      });
    }
  }

  login (req, res) {
    try {
      const loginInfo = {
        email: req.body.email,
        password: req.body.password
      };
      const loginValidation = authLogin.validate(loginInfo);
      if (loginValidation.error) {
        logger.error('Error while trying to login the user');
        res.status(400).send({
          success: false,
          message: 'please check inserted fields',
          data: loginValidation
        });
        return;
      }
      userService.loginUser(loginInfo, (error, data) => {
        if (error) {
          logger.error('Error while trying to login the user', error);
          return res.status(403).json({
            success: false,
            message: 'please check email and password and try again',
            error
          });
        } else {
          logger.info('user logged in successfully', data);
          return res.status(200).json({
            success: true,
            message: 'User successfully logined In',
            token: auth.generateToken(data)
          });
        }
      });
    } catch (error) {
      logger.error('Error while trying to login the user', error);
      return res.status(500).send({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  forgotPassword (req, res) {
    try {
      const userData =
      {
        email: req.body.email
      };
      const forgotValidation = forgotPasswordValidation.validate(userData);
      if (forgotValidation.error) {
        res.status(400).json({
          success: false,
          message: 'Please enter valid field',
          data: forgotValidation
        });
        return;
      }
      userService.forgotPassword(userData, (error, result) => {
        if (error) {
          logger.error('Error while trying to login the user', error);
          return res.status(400).json({
            success: false,
            message: 'please check email and try again',
            error
          });
        } else {
          logger.info('email found and sent link successfully', result);
          return res.status(200).json({
            success: true,
            message: 'User email id exist and reset link sent successfully',
            data: result
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  resetPassword (req, res) {
    try {
      const userData = {
        token: req.headers.token,
        password: req.body.password
      };
      const resetValidation = resetPasswordValidation.validate(userData);
      if (resetValidation.error) {
        res.status(400).json({
          success: false,
          message: 'Please enter valid field',
          data: resetValidation
        });
        return;
      }
      userService.passwordReset(userData, (error, data) => {
        if (error) {
          return res.status(400).json({
            success: false,
            message: 'failed to reset password',
            error
          });
        } else {
          return res.status(200).json({
            success: true,
            message: 'Your password has been reset successfully!!',
            data: data
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

// exporting the class
module.exports = new Controller();
