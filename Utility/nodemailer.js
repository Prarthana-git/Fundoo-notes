const nodemailer = require('nodemailer');
require('dotenv').config();
const ejs = require('ejs');
const logger = require('../config/loggers');

const sendEmail = async (emailId, subject, link) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smpt.gmail.com',
      service: 'gmail',
      port: 465,
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
          to: emailId,
          subject,
          html: `${result}<p>${link}</p>`
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
