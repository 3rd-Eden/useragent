'use strict';

/**
 * Benchmark dependencies
 */
var microtime = require('microtime')
  , benchmark = require('benchmark')
  , yaml = require('yamlparser')
  , path = require('path')
  , fs = require('fs');

/**
 * Useragent parsers
 */
var useragent = require('../')
  , uaparser = require('ua-parser')
  , useragent_parser = require('useragent_parser')
  , useragent_parser2 = require('useragent-parser');

/**
 * Setup the test-files.
 */
var useragentlist = path.join(__dirname, '..', 'test', 'fixtures', 'testcases.yaml')
  , yammy = yaml.eval(fs.readFileSync(useragentlist).toString()).test_cases
  , testcases = yammy.map(function (test) {
      return test.user_agent_string;
    })
  , length = testcases.length;

/**
 * Setup the benchmark
 */

var froomfroom = new benchmark.Suite;

froomfroom
.add('useragent', function () {
  for (var i = 0; i < length; i++ ) {
    useragent.parse(testcases[i]);
  }
})
.add('useragent.lookup', function () {
  for (var i = 0; i < length; i++ ) {
    useragent.lookup(testcases[i]);
  }
})
.add('useragent_parser', function () {
  for (var i = 0; i < length; i++ ) {
    useragent_parser.parse(testcases[i]);
  }
})
.add('useragent-parser', function (){
  for (var i = 0; i < length; i++ ) {
    useragent_parser2.parse(testcases[i]);
  }
})
.add('ua-parser', function () {
  for (var i = 0; i < length; i++ ) {
    uaparser.parseUA(testcases[i]);
  }
})
.on('cycle', function (event) {
  var details = event.target;

  console.log('Executed benchmark against node module: "%s"', details.name);
  console.log('Count (%d), Cycles (%d), Elapsed (%d), Hz (%d)\n'
   , details.count
   , details.cycles
   , details.times.elapsed
   , details.hz
  );
})
.on('complete', function () {
  console.log('Module: "'+ this.filter('fastest').pluck('name') +'" is the user agent fastest parser.');
});

/**
 * Start the benchmark, froom frooom!!
 */
console.log('Starting the benchmark, parsing ' + length + ' useragent strings per run');
console.log();

froomfroom.run();
