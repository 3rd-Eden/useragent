'use strict';

/**
 * Benchmark dependencies.
 */
var benchmark = require('benchmark');

/**
 * Useragent parsers.
 */
var useragent2 = require('../')
  , useragent = require('useragent')
  , uaparser = require('ua-parser')
  , useragent_parser = require('useragent_parser')
  , useragent_parser2 = require('useragent-parser');

/**
 * Setup the test-files.
 */
var testcases = [
    "A".repeat(100),
    "A".repeat(300),
    "A".repeat(700),
    "A".repeat(1000)
  ]
  , length = 4;

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
.add('useragent', function () {
  for (var i = 0; i < length; i++ ) {
    useragent.parse(testcases[i]);
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
  console.log('Module: "'+ this.filter('fastest').map('name') +'" is the user agent fastest parser.');
});

/**
 * Start the benchmark, froom frooom!!
 */
console.log('Starting the benchmark, parsing ' + length + ' useragent strings per run');
console.log();

froomfroom.run();
