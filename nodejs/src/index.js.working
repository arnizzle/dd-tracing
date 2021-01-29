require('dd-trace').init({
  hostname: process.env.DD_AGENT_HOST,
  port: 8126,
  env: 'development',
  logInjection: true,
  analytics: true,
});

const { createLogger, format, transports } = require('winston');
const addAppNameFormat = format(info => {
  info.ddtags = {'logging-mvp': 'dd-tracing-logging-examples-nodejs'};
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
  logger.log('info', 'A simple log that works with Datadog APM tracing and logging!');
  res.send('Hello world, this will demo Datadog tracing and logging!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
