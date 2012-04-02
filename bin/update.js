#!/usr/bin/env node

var updater = require('../lib/update');
updater(function updating (err, data) {
  "use strict";

  if (err) return console.error('Update unsuccessfull due to errors', err.message);

  // yay no issues
  console.log('Successfully fetched and generated new parsers from the internets.');
});
