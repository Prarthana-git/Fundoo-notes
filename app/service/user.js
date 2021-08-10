const userModel = require('../models/user')
class userService {
    registerUser = (user, callback) => {
        userModel.registerUser (user, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    };
    loginUser = (loginInfo, callback) => {
        userModel.loginUser(loginInfo, (err, data)=>{
               if(err){
                    callback(err,null);
                }
               else{
                    callback(null,data);
                }
            });
    }
}
module.exports = new userService();