const express = require('express');
require('dotenv').config();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const logger = require('./config/loggers');

// create express app
const app = express();

// parsing the request from user
app.use(express.urlencoded({ extended: true }));

// parse the request from user
app.use(express.json());

// configuring the database
const dbConfig = require('./config/database.config.js');
dbConfig.dbConnection();
// define a simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to FundooNotes' });
});
require('./app/routes/routes')(app);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
  logger.info('Server is running on port 3000');
});
module.exports = app;
