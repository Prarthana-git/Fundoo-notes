const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: './loggers/info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json())
    }),

    new transports.File({
      filename: './loggers/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});
module.exports = logger;
