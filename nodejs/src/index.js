require('dd-trace').init({
  hostname: process.env.DD_AGENT_HOST,
  port: 8126,
  env: 'dev',
  logInjection: true,
  analytics: true,
});

const { createLogger, format, transports } = require('winston');
const addAppNameFormat = format(info => {
  info.ddtags = {'app': 'dd-tracing', 'team': 'kebab'};
  return info;
});
const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.combine(
    addAppNameFormat(),
    format.json(),
    ),
  transports: [
  new transports.Console(),
  ],
});

const express = require('express');
var app = express();

app.get('/', function (req, res) {

num = Math.floor(Math.random() * 50);

  if (num < 2) {
    // ERROR
    logger.log('info', 'Checking out with discount code NODISCOUNT');
    logger.log('error', 'Discount code NOT available');
  } else {
    logger.log('info', 'Checkout completed');
  }

  res.send('Hello world, this will demo Datadog tracing and logging!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

