require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./loggers');

exports.dbConnection = () => {
  mongoose.Promise = global.Promise;

  // connecting to the database
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => {
    logger.info('Successfully connected to the database');
    // console.log('Successfully connected to the database');
  }).catch(err => {
    logger.err('could not connect to the database.Exiting now..', err);
    // console.log('could not connect to the database.Exiting now..', err);
    process.exit();
  });
  return mongoose.connection;
};
