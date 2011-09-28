var useragent = require('../')
  , should = require('should')
  , yaml = require('yamlparser')
  , fs = require('fs');

[
    'testcases.yaml'
  , 'firefoxes.yaml'
  , 'pgts.yaml'
].forEach(function (filename) {
  var testcases = fs.readFileSync(__dirname +'/fixtures/' + filename).toString()
    , parsedyaml = yaml.eval(testcases);

  testcases = parsedyaml.test_cases;
  testcases.forEach(function (test) {
    // we are unable to parse these tests atm because invalid JSON is used to
    // store the useragents
    if (test.js_ua) return;

    exports[filename + ': ' + test.user_agent_string] = function () {
      var agent = useragent.parse(test.user_agent_string);

      agent.family.should.equal(test.family);
      agent.major.should.equal(typeof test.v1 == 'string' ? test.v1 : '0');
      agent.minor.should.equal(typeof test.v2 == 'string' ? test.v2 : '0');
      agent.patch.should.equal(typeof test.v3 == 'string' ? test.v3 : '0');
    }
  });
});
