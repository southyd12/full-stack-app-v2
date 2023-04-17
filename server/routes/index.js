const express = require("express");
const path = require("path");
const winston = require("winston");
const expressWinston = require("express-winston");

module.exports = function (app) {
  const API_ENDPOINT = "/api";
  const API_VERSION = "v1";

  app.use(`${API_ENDPOINT}/${API_VERSION}/cars`, require("./cars.routes"));

  app.use(
    expressWinston.errorLogger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
    })
  );

  // Optionally you can include your custom error handler after the logging.
  // app.use(
  //   express.errorLogger({
  //     dumpExceptions: true,
  //     showStack: true,
  //   })
  // );

  app.all("*", (req, res) => {
    res.sendStatus(404);
  });
};
