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

var useragent2 = require('../')
  , useragent = require('useragent')
  , uaparser = require('ua-parser');

/**
 * Setup the test-files
 */

var useragentlist = path.join(__dirname, '..', 'tests', 'fixtures', 'testcases.yaml')
  , yammy = yaml.eval(fs.readFileSync(useragentlist).toString()).test_cases
  , testcases = yammy.map(function (test) { return test.user_agent_string })
  , length = testcases.length;

/**
 * Setup the benchmark
 */

var froomfroom = new benchmark.Suite;

froomfroom.add('useragent2', function () {
  for (var i = 0; i < length; i++ ) {
    useragent2.parse(testcases[i]);
  }
})
froomfroom.add('useragent2 dictionary', function () {
  for (var i = 0; i < length; i++ ) {
    useragent2.lookup(testcases[i]);
  }
})
.add('useragent1', function () {
  for (var i = 0; i < length; i++ ) {
    useragent.parser(testcases[i]);
  }
})
.add('ua-parser', function () {
  for (var i = 0; i < length; i++ ) {
    uaparser.parse(testcases[i]);
  }
})
.on('cycle', function (bench, details) {
  console.log('Executed benchmark (%s)', details.name);
  console.log('Count (%d), Cycles (%d), Elapsed (%d), Hz (%d)\n'
             , details.count
             , details.cycles
             , details.times.elapsed
             , details.hz
             );
})
.on('complete', function () {
  console.log(this.filter('fastest').pluck('name') + ' has/have the fastest parser');
});

/**
 * Start the benchmark, froom frooom!!
 */
console.log('Starting the benchmark, parsing ' + length + ' useragent strings per run');
froomfroom.run();
