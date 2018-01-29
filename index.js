'use strict';

var parse = require('./lib/parse')

/**
 * Small nifty thick that allows us to download a fresh set regexs from t3h
 * Int3rNetz when we want to. We will be using the compiled version by default
 * but users can opt-in for updates.
 *
 * @param {Boolean} refresh Refresh the dataset from the remote
 * @api public
 */
module.exports = function updater() {
  try {
    require('./lib/update').update(function updating(err) {
      if (err) {
        console.log('[useragent] Failed to update the parsed due to an error:');
        console.log('[useragent] '+ (err.message ? err.message : err));
        return;
      }

      // Load parser with new regexes
      delete require.cache[require.resolve('./lib/parse')];
      parse = require('./lib/parse');

      // Export all properties from parse
      for (var key in parse) {
        module.exports[key] = parse[key];
      }
    });
  } catch (e) {
    console.error('[useragent] If you want to use automatic updating, please add:');
    console.error('[useragent]   - request (npm install request --save)');
    console.error('[useragent]   - yamlparser (npm install yamlparser --save)');
    console.error('[useragent] To your own package.json');
  }
};

// Export all properties from parse
for (var key in parse) {
  module.exports[key] = parse[key];
}
