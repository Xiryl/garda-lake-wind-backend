const { createLogger, format, transports } = require('winston');

const loggerTransports = [
  new transports.Console({
    level: process.env.LOGGER_STDOUT_LEVEL,
    format: format.combine(
      format.colorize(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.printf(
        (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`,
      ),
    ),
  }),
];

loggerTransports.push(
  new transports.File({ filename: 'log/restapiserver.log', level: 'verbose' }),
);

const logger = createLogger({
  level: process.env.LOGGER_STDOUT_LEVEL,
  transports: loggerTransports,
});

logger.verbose(`[${process.pid}]Starting logger ...`);

module.exports = logger;
