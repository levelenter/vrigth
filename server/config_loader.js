"use strict";
let config = require('config');
console.info(JSON.stringify(config));
console.info("NODE_ENV=%s", process.env.NODE_ENV);

module.exports = config;