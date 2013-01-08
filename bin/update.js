#!/usr/bin/env node

'use strict';

/**
 * Update our definition file.
 */
require('../lib/update').update(function updating(err, data) {
  if (err) return console.error('Update unsuccessfull due to reasons', err.message);
  console.log('Successfully fetched and generated new parsers from the internets.');
});
