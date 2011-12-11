var useragent = require('../')
  , ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.24 Safari/535.2"

// the actual tests
describe('useragent', function () {
  it('should expose the current version number', function () {
    useragent.version.should.match(/^\d+\.\d+\.\d+$/)
  })

  it('should expose the Agent interface', function () {
    useragent.Agent.should.be.a('function')
  })

  it('should expose the JSON parser', function () {
    useragent.fromJSON.should.be.a('function')
  })

  it('should expose the Agent string parser', function () {
    useragent.fromString.should.be.a('function')
  })

  it('should expose the dictionary lookup', function () {
    useragent.lookup.should.be.a('function')
  })

  it('should expose the parser', function () {
    useragent.parse.should.be.a('function')
  })

  it('should expose the useragent tester', function () {
    useragent.is.should.be.a('function')
  })

  describe('#parse', function () {
    it('should not throw errors when no useragent is given', function () {
      var agent = useragent.parse()

      agent.family.should.equal('Other')
      agent.major.should.equal('0')
      agent.minor.should.equal('0')
      agent.patch.should.equal('0')

      agent.os.should.equal('Other')
      agent.toVersion().should.equal('0.0.0')
      agent.toString().should.equal('Other 0.0.0')
      agent.toAgent().should.equal('Other 0.0.0')
      agent.toJSON().should.equal('{"family":"Other","major":"0","minor":"0","patch":"0","os":"Other"}')
    })

    it('should not throw errors on empty strings and default to unkown', function () {
      var agent = useragent.parse('')

      agent.family.should.equal('Other')
      agent.major.should.equal('0')
      agent.minor.should.equal('0')
      agent.patch.should.equal('0')

      agent.os.should.equal('Other')
      agent.toVersion().should.equal('0.0.0')
      agent.toString().should.equal('Other 0.0.0')
      agent.toAgent().should.equal('Other 0.0.0')
      agent.toJSON().should.equal('{"family":"Other","major":"0","minor":"0","patch":"0","os":"Other"}')
    })

    it('should correctly parse chromes user agent', function () {
      var agent = useragent.parse(ua)

      agent.family.should.equal('Chrome')
      agent.major.should.equal('15')
      agent.minor.should.equal('0')
      agent.patch.should.equal('874')

      agent.os.should.equal('Mac OS X')
      agent.toVersion().should.equal('15.0.874')
      agent.toString().should.equal('Chrome 15.0.874 / Mac OS X')
      agent.toAgent().should.equal('Chrome 15.0.874')
      agent.toJSON().should.equal('{"family":"Chrome","major":"15","minor":"0","patch":"874","os":"Mac OS X"}')
    })
  })

  describe('#is', function () {
    var chrome = ua
      , firefox = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:8.0) Gecko/20100101 Firefox/8.0'

    it('should not throw errors when called without arguments', function () {
      useragent.is()
      useragent.is('')
    })

    it('should correctly detect google chrome', function () {
      useragent.is(chrome).chrome.should.be_true
      useragent.is(chrome).webkit.should.be_true
      useragent.is(chrome).firefox.should.be_false
      useragent.is(chrome).mozilla.should.be_false
      useragent.is(chrome).ie.should.be_false
      useragent.is(chrome).opera.should.be_false
      useragent.is(chrome).mobile_safari.should.be_false
    })

    it('should correctly detect firefox', function () {
      useragent.is(firefox).chrome.should.be_false
      useragent.is(firefox).webkit.should.be_false
      useragent.is(firefox).firefox.should.be_true
      useragent.is(firefox).mozilla.should.be_false
      useragent.is(firefox).ie.should.be_false
      useragent.is(firefox).opera.should.be_false
      useragent.is(firefox).mobile_safari.should.be_false
    })
  })

  describe('#fromString', function () {
    it('should reparse an Agent string with operating system', function () {
      var agent = useragent.fromString('Chrome 15.0.874 / Mac OS X')

      agent.family.should.equal('Chrome')
      agent.major.should.equal('15')
      agent.minor.should.equal('0')
      agent.patch.should.equal('874')

      agent.os.should.equal('Mac OS X')
      agent.toVersion().should.equal('15.0.874')
      agent.toString().should.equal('Chrome 15.0.874 / Mac OS X')
      agent.toAgent().should.equal('Chrome 15.0.874')
      agent.toJSON().should.equal('{"family":"Chrome","major":"15","minor":"0","patch":"874","os":"Mac OS X"}')
    })

    it('should reparse an Agent string without operating system', function () {
      var agent = useragent.fromString('Chrome 15.0.874');

      agent.family.should.equal('Chrome');
      agent.major.should.equal('15');
      agent.minor.should.equal('0');
      agent.patch.should.equal('874');

      agent.os.should.equal('Other');
      agent.toVersion().should.equal('15.0.874');
      agent.toAgent().should.equal('Chrome 15.0.874');
    })
  })
})
