#!/usr/bin/env node

var updater = require('../lib/update');
updater(function (err, data) {
  if (err)
    return console.error('Update unsuccessfull due to errors', err.message);

  console.log('successfully updated to the parsers');
});
