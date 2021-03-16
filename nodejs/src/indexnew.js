
require('dd-trace').init({
  hostname: process.env.DD_AGENT_HOST,
  port: 8126,
  env: 'dev',
  logInjection: true,
  analytics: true,
});

import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '99bc3f38-2b01-4f16-933f-a684aadec036',
    clientToken: 'pubab07b3306c34fef652655080386490ae',
    site: 'datadoghq.eu',
    service: 'nodejs',
    env: 'production',
    version: '1.0.0',
    sampleRate: 100,
    trackInteractions: true
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

  res.send('Hello world v1.1, this will demo Datadog tracing and logging!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


