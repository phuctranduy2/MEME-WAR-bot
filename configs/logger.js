const winston = require("winston");

// Custom log format with colors
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    const color = {
      error: "\x1b[31m", // Red
      warn: "\x1b[33m", // Yellow
      info: "\x1b[36m", // Cyan
      debug: "\x1b[37m", // White
      reset: "\x1b[0m", // Reset
    };
    return `${timestamp} | ${color[level]}${level.toUpperCase()}${
      color.reset
    } | ${message}`;
  })
);

// Configure logger with console only
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: customFormat,
  transports: [new winston.transports.Console()],
});

module.exports = logger;
