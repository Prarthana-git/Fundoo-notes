const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
},
    {
        timesstamps: true
    })

const user = mongoose.model('user', userSchema);

class userModel {
    registerUser = (userdetails, callback) => {
        const newUser = new user({
            firstName: userdetails.firstName,
            lastName: userdetails.lastName,
            email: userdetails.email,
            password: userdetails.password,
        });

        newUser.save((error, data) => {
            return (error) ? callback(error, null) : callback(null, data)
        });
    }
    loginUser = (loginData, callBack) => {
        user.findOne({ 'email': loginData.email }, (error, data) => {
            if (error) {
                return callBack(error, null);
            } else if (!data) {
                return callBack("Invalid Credentials", null);
            }else
            return callBack(null, data);
        });
    }
}
//exporting the class
module.exports = new userModel();