/**
 * @description   : It is use to create schema in data base and doing schema vlidation and
 *                  encrypting password.
 * @package       : mongoose, bcrypt
 * @file          : user.js
 * @author        : Prarthana Chaudhari
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//create instance of schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
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
        timestamps: true
    })

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

const user = mongoose.model('user', userSchema);

class userModel {

    registerUser = async(userDetails,callback) => {
        const newUser = new user({
            firstName:userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password:userDetails.password,
        });
       const data= await user.findOne({ email: userDetails.email });
        if (data) {
           callback('User already exist',data)
            }
         else {
                 const result= await newUser.save();
               callback(null,result);
        }
    }
    /**
   * @description     : It uses to login the registered user
   * @param           : loginData, callback
  */

    loginUser = (loginData, callBack) => {
        user.findOne({ email: loginData.email }, (error, data) => {
            if (error) {
                return callBack(error, null);
            } else if (!data) {
                return callBack("Invalid Credentials", null);
            } else
                return callBack(null, data);
        });
    }
}
//exporting the class
module.exports = new userModel();
