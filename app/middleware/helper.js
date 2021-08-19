const jwt = require('jsonwebtoken');
// const logger = require('../../config/loggers');
const nodeMailer = require('nodemailer');
require('dotenv').config();
/**
 * @description Function to generate token if the credentials passes
 * @returns jwt token
 */
class Helper {
  generateToken (loginInput) {
    const token = jwt.sign(loginInput, process.env.TOKEN_GENERATE, {
      expiresIn: '3000s'
    });
    return token;
  }

  verifyingToken (req, res, next) {
    const token = req.get('token');
    return (token)
      ? jwt.verify(token, process.env.TOKEN_GENERATE, error => {
        return (error)
          ? res.status(400).send({
            success: false,
            message: 'Invalid Token'
          })
          : next();
      })
      : res.status(401).send({
        success: false,
        message: 'Authorisation failed! Invalid user'
      });
  }

  forgotPasswordToken (loginInput) {
    const token = jwt.sign(loginInput.toJSON(), process.env.TOKEN_GENERATE, {
      expiresIn: '3000s'
    });
    return token;
  }

  sendEmail (data) {
    // eslint-disable-next-line no-unused-vars
    const smtptransporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.email,
        pass: process.env.password
      }
    });
    // ejs.renderFile('./email.ejs', (error, result) => {
    //   if (error) {
    //     logger.log('error', error);
    //   } else {
    //     const mailInfo = {
    //       from: process.env.email,
    //       to: data.email,
    //       subject: 'Password Reset Link',
    //       html: `${result}<p> ${process.env.CLlENT_URL}${this.generateToken(data)}</p>`
    //     };
    //     smtptransporter.sendMail(mailInfo, (err, data) => {
    //       const sendEmailData = err ? logger.log('error', err) : logger.log('info', data);
    //       return sendEmailData;
    //     });
    //   }
    // });
  }

  getEmailFromToken (token) {
    const decoded = jwt.verify(token, process.env.TOKEN_GENERATE);
    return decoded.email;
  }
}
module.exports = new Helper();
