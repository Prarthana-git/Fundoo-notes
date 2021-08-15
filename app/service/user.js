const userModel = require('../models/user')
const auth = require('../middleware/authenticate')
const bcrypt=require('bcrypt')
class userService {
    registerUser = (user, callback) => {
        userModel.registerUser(user, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    };
    loginUser = (loginInfo, callback) => {
        userModel.loginUser(loginInfo, (err, data) => {
            if (data) {
                bcrypt.compare(loginInfo.password, data.password, (err, data) => {
                    if (err) {
                        callback(err, null);
                    }
                    if (data) {
                        const token=auth.generateToken(loginInfo)
                        return callback(null, token);
                    }
                    else {
                        callback('Password does not match');
                    }
                });
            } else {
                callback('Please check your email id and password');
            }
        });
    }
}

module.exports = new userService();