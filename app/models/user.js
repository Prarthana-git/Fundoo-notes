
/**
 * @description   : It is use to create schema in data base and doing schema vlidation and
 *                  encrypting password.
 * @package       : mongoose, bcrypt
 * @file          : user.js
 * @author        : Prarthana Chaudhari
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const logger = require('../../config/loggers');
// create instance of schema
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: /^[a-zA-Z ]{3,30}$/
  },
  lastName: {
    type: String,
    required: true,
    validate: /^[a-zA-Z ]{3,30}$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
},
{
  timestamps: true
});
/**
 * @description     : It is converting password content to a encrypted to form using pre middleware
 *                    of mongoose and bcrypt npm package.
 * @middleware      : pre is the middleware of mongoose schema
 * @package         : bcrypt is used to encrpt the password we are getting from client side
*/
userSchema.pre('save', async function (next) {
  try {
    // generate a salt
    const salt = await bcrypt.genSalt(10);
    // hash the password along with our new salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // override the cleartext password with the hashed one
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('user', userSchema);

class UserModel {
  async registerUser (userDetails, callback) {
    const newUser = new User({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password
    });
    const data = await User.findOne({ email: userDetails.email });
    if (data) {
      logger.error('User already exist', data);
      return callback(new Error('User already exist'));
    } else {
      const result = await newUser.save();
      callback(null, result);
    }
  }
  /**
   * @description     : It uses to login the registered user
   * @param           : loginData, callback
  */

  loginUser (loginData, callBack) {
    User.findOne({ email: loginData.email }, (error, data) => {
      if (error) {
        logger.error('Error while finding user', error);
        return callBack(error, null);
      } else if (!data) {
        logger.info('Invalid Credentials', data);
        return callBack('Invalid Credentials', null);
      } else {
        return callBack(null, data);
      }
    });
  }
}
// exporting the class
module.exports = new UserModel();
