const nodemailer = require('nodemailer');
require('dotenv').config();
const ejs = require('ejs');
const logger = require('../config/loggers');
const help = require('../app/middleware/helper');

const sendEmail = (data) => {
  try {
    const newToken = help.generateToken(data);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    ejs.renderFile('view/email.ejs', (error, result) => {
      if (error) {
        logger.error('nodemailer error', error);
      } else {
        const mailOptions = {
          from: process.env.EMAIL,
          to: data.email,
          subject: 'Password Reset Link',
          html: `${result}<p>${process.env.CLlENTURL}${newToken}</p>`
        };

        transporter.sendMail(mailOptions, (info) => {
          const sendEmailInfo = error ? logger.error('error', error) : logger.info('info', info);
          return sendEmailInfo;
        });
      }
    });
  } catch (error) {
    return error;
  }
};
module.exports = sendEmail;
