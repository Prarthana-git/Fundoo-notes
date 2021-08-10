const userService = require('../service/user')

class Controller {
    register = (req, res) => {
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password
            };
            userService.registerUser(user, (error, data) => {
                if (error) {
                    return res.status(409).json({
                        success: false,
                        message: 'User already exist',
                    });
                } else {
                    return res.status(201).json({
                        success: true, message: "User Registered",
                        data: data,
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false, message: "Error While Registering",
                data: null,
            });
        }
    }
    login = (req, res) => {
        try {
            const loginInfo = {
                email: req.body.email,
                password: req.body.password
            }

            userService.loginUser(loginInfo, (error, data) => {
                if (error) {
                    return res.status(403).json({
                        success: false,
                        message: "please check email and password and try again",
                        error,
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "User successfully logined In",
                        data,
                    });
                }
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: 'Internal server error',
            });
        }
    }
}
//exporting the class
module.exports = new Controller();