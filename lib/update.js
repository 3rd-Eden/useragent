"use strict";

var request = require('request')
  , yaml = require('yamlparser')
  , path = require('path')
  , fs = require('fs')
  , vm = require('vm');

/**
 * Fetches a new version of the user agent yaml
 *
 * @param {Function} fn Callback function
 * @api public
 */

module.exports = function update (fn) {
  var ua_parsers = []
    , os_parsers = [];

  /**
   * Parses the yaml file and adds to our ua / os parser array
   *
   * @param {String} yamlstring The string that needs to be extracted
   * @returns {Boolean} Success
   * @api private
   */

  function convert (yamlstring) {
    // try to see if we can parse the yaml
    var parsed_yaml;

    try { parsed_yaml = yaml.eval(yamlstring); }
    catch (e) { return false; }

    // make sure we have a correct structure because we are reading this from
    // a remote resource, they might change the structure of the JSON
    if (
           !('user_agent_parsers' in parsed_yaml)
        || !parsed_yaml.user_agent_parsers.length
        || !parsed_yaml.user_agent_parsers[0].regex
        || !('os_parsers' in parsed_yaml)
        || !parsed_yaml.os_parsers.length
        || !parsed_yaml.os_parsers[0].regex
    ) return false;

    // \o/ working, now to create pre-compiled version of the regexps
    // now we can try to generate a smaller file so it will take less memory
    // once we load thing in memory
    var agents = parsed_yaml.user_agent_parsers
      , os = parsed_yaml.os_parsers
      , parser, i, l;

    // small note about the odd syntax here, we need to JSON.stingify the
    // regexp so that we are storing it as valid escaped string

    // generate array of user agent parsers
    for (i = 0, l = agents.length; i < l; i++) {
      parser = 'r:new RegExp('+ JSON.stringify(agents[i].regex) + ')';

      // check for potential family replacements
      if (agents[i].family_replacement)
        parser += ', family:"' + agents[i].family_replacement + '"';

      if (agents[i].major_version_replacement)
        parser += ', major: "' + agents[i].major_version_replacement + '"';

      ua_parsers.push('{' + parser + '}');
    }

    // generate array of os parsers
    for (i = 0, l = os.length; i < l; i++) {
      parser = 'r:new RegExp('+ JSON.stringify(os[i].regex) + ')';

      // check for potential os replacements
      if (os[i].os_replacement)
        parser += ', os:"' + os[i].os_replacement + '"';

      os_parsers.push('{' + parser + '}');
    }

    agents.length = os.length = parsed_yaml = 0;
    return true;
  }

  /**
   * The conversion of the files has been done, output the file and write it
   *
   * @api private
   */

  function output () {
    // now that we have generated arrays of parsers we are gonna build up the
    // file and make it happen.
    var agentjs = 'exports.browser = ['+ ua_parsers.join(',') + '];';
    agentjs += 'exports.os = [' + os_parsers.join(',') + '];';

    // parse down to javascript, we don't want to eval it because someone might
    // have been naught with our internet and injected a require() statment in
    // the codez, paranoid ftw
    var sandbox = { exports: {} };
    try { vm.runInNewContext(agentjs, sandbox, 'agentjs.vm'); }
    catch (e) { return fn(e); }

    fn(null, sandbox.exports);

    // awesome, we just compiled our own library, time to write to file but do
    // note that this should be last, as there couldd be compile errors
    fs.writeFile(exports.output, agentjs, function (err) {
     // we really don't care if we could write or not..
    });
  }

  // fetch the remote database from the ua-parser google code project
  request(exports.remote, function remoteResponse (err, res, data) {
    if (err) return fn(err);
    if (res.statusCode !== 200) return fn(new Error('incorrect status code'));
    if (!convert(data)) return fn(new Error('unable to parse remote useragent db'));

    // now that we parsed the remote file, do the same for the our custom local
    // useragent database
    fs.readFile(exports.local, 'utf8', function (err, data) {
      if (err) return fn(err);
      if (!convert(data)) return fn(new Error('unable to parse local useragent db'));

      output();
    });
  });
};

/**
 * Constants
 */

exports.version = '0.0.1';
exports.remote = 'http://ua-parser.googlecode.com/svn/trunk/resources/user_agent_parser.yaml';
exports.local = path.join(__dirname, '..', 'static', 'user_agent.after.yaml');
exports.output = path.join(__dirname, '..', 'lib', 'agents.js');
