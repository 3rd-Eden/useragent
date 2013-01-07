"use strict";

/**
 * Library dependencies.
 */

var agents = require('./lib/agents');

/**
 * The representation of a parsed user agent.
 *
 * @constructor
 * @param {String} family The name of the browser
 * @param {String} major Major version of the browser
 * @param {String} minor Minor version of the browser
 * @param {String} patch Patch version of the browser
 * @param {String} os Operating system
 * @param {String} device Device name
 * @api public
 */

function Agent (family, major, minor, patch, os, device) {
  this.family = family || 'Other';
  this.major = major || '0';
  this.minor = minor || '0';
  this.patch = patch || '0';
  this.os = os || 'Other';
  this.device = device || 'Generic Computer';
}

/**
 * Generates a string output of the parsed user agent.
 *
 * @returns {String}
 * @api public
 */

Agent.prototype.toAgent = function toAgent () {
  var output = this.family
    , version = this.toVersion();

  if (version) output += ' ' + version;
  return output;
};

/**
 * Generates a string output of the parser user agent and operating system.
 *
 * @returns {String}  "UserAgent 0.0.0 / OS"
 * @api public
 */

Agent.prototype.toString = function toString () {
  var agent = this.toAgent()
    , os = this.os !== 'Other' ? this.os : false;

  return agent + (os ? ' / ' + os : '');
};

/**
 * Outputs a compiled veersion number of the user agent.
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
      version += (isNaN(+this.patch) ? ' ' : '.') + this.patch;
     }
    }
  }

  return version;
};

/**
 * Outputs a JSON string of the Agent
 *
 * @returns {String}
 * @api public
 */

Agent.prototype.toJSON = function toJSON () {
  return JSON.stringify({
      family: this.family
    , major: this.major
    , minor: this.minor
    , patch: this.patch
    , device: this.device
    , os: this.os
  });
};

/**
 * Parses the user agent string with the generated parsers from the
 * ua-parser project on google code.
 *
 * @param {String} useragent The user agent string
 * @param {String} jsagent Optional UA from js to detect chrome frame
 * @returns {Agent}
 * @api public
 */

function parse (useragent, jsagent) {
  if (!useragent) return new Agent;

  var ua, os, device, i
    , browsers = parse.browsers
    , oss = parse.os
    , devices = parse.devices
    , ualength = parse.ua_length
    , oslength = parse.os_length
    , deviceslength = parse.devices_length;

  // find the user agent
  for (i = 0; i < ualength; i++) {
    if (ua = useragent.match(browsers[i].r)) {
      var browser = browsers[i];
      if (browser.family) ua[1] = browser.family.replace('$1', ua[1]);
      if (browser.major) ua[2] = browser.major;
      if (browser.minor) ua[3] = browser.minor;

      break;
    }
  }

  // find the os
  for (i = 0; i < oslength; i++) {
    if (os = useragent.match(oss[i].r)) {
      os[1] = oss[i].os
        ? oss[i].os.replace('$1', os[1])
        : os[1];

      break;
    }
  }

  for (i = 0; i < deviceslength; i++) {
    if (device = useragent.match(devices[i].r)) {
      device[1] = devices[i].device
        ? devices[i].device.replace('$1', device[1])
        : device[1];

      break;
    }
  }

  ua = ua || [];
  os = os || [];
  device = device || [];

  // detect chrome frame, but make sure it's enabled! So we need to check for
  // the Chrome/ so we know that it's actually using Chrome under the hood
  if (jsagent &&
      (jsagent.indexOf('Chrome/') !== -1 && useragent.indexOf('chromeframe') !== -1)
  ) {
    ua[1] = 'Chrome Frame (' + ua[1] + ' ' + ua[2] + ')';
    var parser = parse(jsagent);

    // update to the new correct version numbers of chrome frame
    ua[2] = parser.major;
    ua[3] = parser.minor;
    ua[4] = parser.patch;
  }

  return new Agent(ua[1], ua[2], ua[3], ua[4], os[1], device[1]);
}

/**
 * Quick lookup references, object lookups are faster than global lookup
 */

parse.browsers = agents.browser;
parse.os = agents.os;
parse.devices = agents.device;
parse.ua_length = parse.browsers.length;
parse.os_length = parse.os.length;
parse.devices_length = parse.devices.length;

/**
 * Small nifty thick that allows us to download a fresh set regexs from t3h
 * Int3rNetz when we want to. We will be using the compiled version by default
 * but users can opt-in for updates.
 *
 * @param {Boolean} refresh Refresh the dataset from the remote
 * @api public
 */

function updater (refresh) {
  // check if we need to refresh the code from the live servers this does not
  // impact the rest of the library, it will just update the `agents` code.
  if (refresh) {
    require('./lib/update')(function updating (err, set) {
      if (err) return; // use old set on error

      // update our agents and lenghts
      agents = set;

      // update the references to the browsers
      parse.browsers = agents.browser;
      parse.os = agents.os;

      // count the browsers and operating systems again
      parse.ua_length = parse.browsers.length;
      parse.os_length = parse.os.length;
    });
  }
}

/**
 * Does a more inaccurate but more common check for useragents identification.
 * The version detection is from the jQuery.com library and is licensed under
 * MIT.
 *
 * @param {String} useragent The user agent
 * @returns {Object} matches
 * @api public
 */

function is (useragent) {
  var ua = (useragent || '').toLowerCase()
    , details = {
        webkit: false
      , mozilla: false
      , chrome: false
      , safari: false
      , mobile_safari: false
      , opera: false
      , ie: false
      , firefox: false
      , version: (ua.match(is.versionRE) || [0, "0"])[1]
    };

  if (~ua.indexOf('webkit')) {
    details.webkit = true;

    if (~ua.indexOf('chrome')) {
      details.chrome = true;
    } else if (~ua.indexOf('safari')) {
      details.safari = true;

      if (~ua.indexOf('mobile') && ~ua.indexOf('apple')) {
        details.mobile_safari = true;
      }
    }
  } else if (~ua.indexOf('opera')) {
    details.opera = true;
  } else if (~ua.indexOf('mozilla') && ua.indexOf('compatible') < 0) {
    details.mozilla = true;

    if (~ua.indexOf('firefox')) details.firefox = true;
  } else if (~ua.indexOf('msie')) {
    details.ie = true;
  }

  return details;
}

/**
 * Parses out the version numbers.
 *
 * @type {RegExp}
 * @api private
 */

is.versionRE = /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/;

/**
 * Converts the result of Agent.toString() back to a new Agent.
 *
 * @param {String} prettyAgent
 * @returns {Agent}
 * @api public
 */

function fromString (prettyAgent) {
  var parts = prettyAgent.split(' / ')
    , partition = parts[0].split(' ')
    , versions = partition[1].split('.');

  // return a new user agent instance
  return new Agent(partition[0]
    , versions[0]
    , versions[1]
    , partition.length === 3 ? partition[2] : versions[2]
    , parts.length === 2 ? parts[1] : null
  );
}

/**
 * Transforms a JSON structure back to a new Agent
 *
 * @param {Object} data The JSON output of a Agent.toJSON()
 * @returns {Agent}
 * @api public
 */

function fromJSON (data) {
  return new Agent(data.family, data.major, data.minor, data.patch, data.os);
}

/**
 * If you are doing a lot of lookups you might want to cache the results of the
 * parsed user agent string instead, in memory.
 *
 * It takes the same arguments as the regular parse function.
 * @api public
 */

function dictionary (ua, jsua) {
  var key = ua + jsua
    , match = dictionary.lookup[key];

  if (match) return match;
  return (dictionary.lookup[key] = parse(ua, jsua));
}

/**
 * The dictionary for lookups
 *
 * @type {Object}
 * @api private
 */

dictionary.lookup = {};

/**
 * Expose the Agent constructor.
 *
 * @api private
 */

updater.Agent = Agent;

/**
 * Expose the useragent parser.
 *
 * @api public
 */

updater.parse = parse;

/**
 * Expose the dictionary method for faster lookups.
 *
 * @api public
 */

updater.lookup = dictionary;

/**
 * Expose our agent string parser.
 *
 * @api public
 */

updater.fromString = fromString;

/**
 * Expose our agent json parser.
 *
 * @api public
 */

updater.fromJSON = fromJSON;

/**
 * Expose our quick useragent tester.
 *
 * @api public
 */

updater.is = is;

/**
 * Library version.
 *
 * @api public
 */

updater.version = '1.0.5';

/**
 * Expose the updater.
 *
 * @api public
 */

module.exports = updater;
