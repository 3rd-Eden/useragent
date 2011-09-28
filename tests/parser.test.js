var useragent = require('../')
  , should = require('should');

// make sure we have proper stack traces for when things fail
require('long-stack-traces');

// the actual tests
module.exports = {
  'semver compatible version number': function (next) {
    useragent.version.should.match(/^\d+\.\d+\.\d+$/);
  }
}
