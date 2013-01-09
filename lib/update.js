'use strict';

/**
 * Build in Native modules.
 */
var path = require('path')
  , fs = require('fs')
  , vm = require('vm');

/**
 * Third party modules.
 */
var request = require('request')
  , yaml = require('yamlparser');

exports.update = function update(callback) {
  // Fetch the remote resource as that is frequently updated
  request(exports.remote, function downloading(err, res, remote) {
    if (err) return callback(err);
    if (res.statusCode !== 200) return callback(new Error('Invalid statusCode returned'));

    // Also get some local additions that are missing from the source
    fs.readFile(exports.local, 'utf8', function reading(err, local) {
      if (err) return callback(err);

      // Parse the contents
      exports.parse([ remote, local ], function parsing(err, results, source) {
        callback(err, results);

        if (!err && source) {
          fs.writeFile(exports.output, source, function idk(err) {
            if (err) {
              console.error('Failed to save the generated file due to reasons', err);
            }
          });
        }
      });
    });
  });
};

exports.parse = function parse(sources, callback) {
  var results = {};

  sources.forEach(function parser(data) {
    // Try to repair some of the odd structures that are in the yaml files
    // before parsing it so we generate a uniform structure:

    // Normalize the Operating system versions:
    data = data.replace(/os_v([1-3])_replacement/gim, function replace(match, version) {
      return 'v'+ version +'_replacement';
    });

    // Make sure that we are able to parse the yaml string
    try { data = yaml.eval(data); }
    catch (e) {
      callback(e);
      return callback = null;
    }

    [
        { resource: 'user_agent_parsers', replacement: 'family_replacement' }
      , { resource: 'device_parsers', replacement: 'device_replacement' }
      , { resource: 'os_parsers', replacement: 'os_replacement' }
    ].forEach(function parsing(details) {
      results[details.resource] = results[details.resource] || [];

      var resources = data[details.resource]
        , resource
        , parser;

      for (var i = 0, l = resources.length; i < l; i++) {
        resource = resources[i];

        // We need to JSON stringify the data to properly add slashes escape other
        // kinds of crap in the RegularExpression. If we don't do thing we get
        // some illegal token warnings.
        parser = 'new RegExp('+ JSON.stringify(resource.regex) + ')';

        // Check if we have replacement for the parsed family name
        if (resource[details.replacement]) {
          parser += ', "'+ resource[details.replacement].replace('"', '\\"') +'"';
        } else {
          parser += ', 0';
        }

        if (resource.v1_replacement) {
          parser += ', "'+ resource.v1_replacement.replace('"', '\\"') +'"';
        } else {
          parser += ', 0';
        }

        if (resource.v2_replacement) {
          parser += ', "'+ resource.v2_replacement.replace('"', '\\"') +'"';
        } else {
          parser += ', 0';
        }

        if (resource.v3_replacement) {
          parser += ', "'+ resource.v3_replacement.replace('"', '\\"') +'"';
        } else {
          parser += ', 0';
        }

        results[details.resource].push('[ ' + parser + ' ]');
      }
    });
  });

  // Generate a correct format
  exports.generate(results, callback);
};

exports.generate = function generate(results, callback) {
  var regexps  = [
      'exports.browser = [\n    '+ results.user_agent_parsers.join('\n  , ') +'\n];'
    , 'exports.device = [\n    '+ results.device_parsers.join('\n  , ') +'\n];'
    , 'exports.os = [\n    '+ results.os_parsers.join('\n  , ') +'\n];'
  ].join('\n\n');

  // Now that we have generated the structure for the RegExps export file we
  // need to validate that we created a JavaScript compatible file, if we would
  // write the file without checking it's content we could be breaking the
  // module.
  var sandbox = {
      exports: {} // Emulate a module context, so everything is attached here
  };

  // Crossing our fingers that it worked
  try { vm.runInNewContext(regexps, sandbox, 'validating.vm'); }
  catch (e) { return callback(e); }

  callback(undefined, sandbox.exports, regexps);
};

/**
 * The location of the ua-parser regexes yaml file.
 *
 * @type {String}
 * @api private
 */
exports.remote = 'https://raw.github.com/tobie/ua-parser/master/regexes.yaml';

/**
 * The location of our local regexes yaml file.
 *
 * @type {String}
 * @api private
 */
exports.local = path.resolve(__dirname, '..', 'static', 'user_agent.after.yaml');

/**
 * The the output location for the generated regexps file
 *
 * @type {String}
 * @api private
 */
exports.output = path.resolve(__dirname, '..', 'lib', 'regexps.js');
