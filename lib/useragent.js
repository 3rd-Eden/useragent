/**
 * Library dependencies
 */

var semver = require('semver')
  , update = require('./update')
  , agents = require('./agents');

module.exports = function (refresh) {
  var ua_length = agents.browser.length
    , ua_length = agents.os.length
    , browsers = agents.browser
    , oss = agents.os;

  // check if we need to refresh the code from the live servers this does not
  // impact the rest of the library, it will just update the `agents` code.
  if (refresh) {
    update(function (err, set) {
      if (err) return; // use old set on error

      // update our agents and lenghts
      agents = set;

      browsers = agents.browser;
      oss = agents.os;

      ua_length = agents.browser.length;
      os_length = agents.os.length;
    });
  }

  /**
   * The representation of a parsed user agent
   *
   * @constructor
   * @param {String} family The name of the browser
   * @param {String} major Major version of the browser
   * @param {String} minor Minor version of the browser
   * @param {String} patch Patch version of the browser
   * @param {String} os Operating system
   * @api public
   */

  function Agent (family, major, minor, patch, os) {
    this.family = family || 'Unknown';
    this.major = major || 0;
    this.minor = minor || 0;
    this.patch = patch || 0;
    this.os = os || 'Unknown';
  }

  /**
   * Generates a string output of the parsed user agent
   *
   * @returns {String}
   * @api public
   */

  Agent.prototype.toString = function toString () {
    var output = this.family
      , version = this.toVersion();

    if (version) output += ' ' + version;
    return output;
  };

  /**
   * Outputs a compiled veersion number of the user agent
   *
   * @returns {String}
   * @api public
   */

  Agent.prototype.toVersion = function toVersion () {
    var version = '';

    if (this.major) {
      version += this.major;
      if (this.minor) {
       version += '.' + this.minor;
       // special case here, the patch can also be Alpha, Beta etc so we need
       // to check if it's a string or not.
       if (this.patch) {
        version += (+this.patch ? '.' : ' ') + this.patch;
       }
      }
    }

    return version;
  };

  /**
   * Checks if the user agent's version can be satisfied agents the give
   * ranged argument.
   *
   * @param {String} ranged The range the version has to satisfie
   * @returns {Boolean}
   * @api public
   */

  Agent.prototype.satisfies = function satisfies (range) {
    return semver.satisfies(this.major + '.' + this.minor + '.' + this.patch, range);
  };

  // return the exposed API
  return {
      /**
       * Parses the user agent string with the generated parsers from the
       * ua-parser project on google code.
       *
       * @param {String} useragent The user agent string
       * @param {String} jsagent Option UA from js to detect chrome frame
       * @returns {Agent}
       * @api public
       */

      parser: function parse (useragent, jsagent) {
        var ua, os, i;

        // find the user agent
        for (i = 0; i < ua_length; i++) {
          if (ua = useragent.match(browsers[i].r)) {
            ua.parser = browsers[i];
            break;
          }
        }

        // find the os
        for (i = 0; i < os_length; i++) {
          if (os = useragent.match(oss[i])) {
            os.parser = oss[i];
            break;
          }
        }

        // check to see if we need to some replacements
        var family = ua.parser.family ? ua.parser.family.replace('$1', ua[1])
          , major = ua.parser.major || ua[2]
          , minor = ua[3]
          , patch = ua[4]
          , osys = os.parser.os || os[1];

        if (jsagent && jsagent.indexOf('chromeframe') !== -1)
          family = 'Chrome Frame(' + family + ' ' + major + ')';

        return new Agent(family, major, minor, patch, osys);
      }
  }
};

/**
 * Library version
 */

exports.version = '0.0.1';
