'use strict';


/**
 * Benchmark dependencies.
 */
var microtime = require('microtime')
  , benchmark = require('benchmark')
  , yaml = require('yamlparser')
  , path = require('path')
  , fs = require('fs');

/**
 * Useragent parsers.
 */
var useragent2 = require('../')
  , useragent = require('useragent');

/**
 * Figure out which test we want to run.
 */
var file = process.argv.slice(2)[0] || 'testcases';

/**
 * Setup the test-files.
 */
var useragentlist = path.join(__dirname, '..', 'test', 'fixtures', file+'.yaml')
  , yammy = yaml.eval(fs.readFileSync(useragentlist).toString()).test_cases
  , testcases = yammy.map(function (test) {
      return test.user_agent_string;
    }).slice(0, 1000)
  , length = testcases.length;

/**
 * Setup the benchmark
 */
var froomfroom = new benchmark.Suite;

froomfroom
.add('useragent latest', function () {
  for (var i = 0; i < length; i++ ) {
    useragent2.parse(testcases[i]);
  }
})
.add('useragent1', function () {
  for (var i = 0; i < length; i++ ) {
    useragent.parse(testcases[i]);
  }
})
.on('cycle', function (event) {
  var details = event.target;

  console.log('Executed benchmark (%s)', details.name);
  console.log('Count (%d), Cycles (%d), Elapsed (%d), Hz (%d)\n'
   , details.count
   , details.cycles
   , details.times.elapsed
   , details.hz
  );
})
.on('complete', function () {
  console.log(this.filter('fastest').pluck('name') + ' is the fastest parser');
});

/**
 * Start the benchmark, froom frooom!!
 */
froomfroom.run({ minSamples: 100 });
