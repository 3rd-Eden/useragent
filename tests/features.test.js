var useragent = require('../')
  , should = require('should')
  , features = require('../features');

// use a fixed user agent to ensure proper test results each time
var ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.24 Safari/535.2";

// make sure we have proper stack traces for when things fail
require('long-stack-traces');

// the actual tests
module.exports = {
 'satisfy that range selector': function () {
   var agent = useragent.parse(ua);

   agent.satisfies('15.x || >=19.5.0 || 25.0.0 - 17.2.3').should.be_true;
   agent.satisfies('>16.12.0').should.be_false;
 }
};
