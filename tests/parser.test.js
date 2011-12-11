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
      , ie = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; yie8)'
      , opera = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; de) Opera 11.51'
      , safari = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; da-dk) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1'
      , ipod = 'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; ja-jp) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5'

    it('should not throw errors when called without arguments', function () {
      useragent.is()
      useragent.is('')
    })

    it('should correctly detect google chrome', function () {
      useragent.is(chrome).chrome.should.be.true
      useragent.is(chrome).webkit.should.be.true
      useragent.is(chrome).safari.should.be.false
      useragent.is(chrome).firefox.should.be.false
      useragent.is(chrome).mozilla.should.be.false
      useragent.is(chrome).ie.should.be.false
      useragent.is(chrome).opera.should.be.false
      useragent.is(chrome).mobile_safari.should.be.false
    })

    it('should correctly detect firefox', function () {
      useragent.is(firefox).chrome.should.be.false
      useragent.is(firefox).webkit.should.be.false
      useragent.is(firefox).safari.should.be.false
      useragent.is(firefox).firefox.should.be.true
      useragent.is(firefox).mozilla.should.be.true
      useragent.is(firefox).ie.should.be.false
      useragent.is(firefox).opera.should.be.false
      useragent.is(firefox).mobile_safari.should.be.false
    })

    it('should correctly detect internet explorer', function () {
      useragent.is(ie).chrome.should.be.false
      useragent.is(ie).webkit.should.be.false
      useragent.is(ie).safari.should.be.false
      useragent.is(ie).firefox.should.be.false
      useragent.is(ie).mozilla.should.be.false
      useragent.is(ie).ie.should.be.true
      useragent.is(ie).opera.should.be.false
      useragent.is(ie).mobile_safari.should.be.false
    })

    it('should correctly detect opera', function () {
      useragent.is(opera).chrome.should.be.false
      useragent.is(opera).webkit.should.be.false
      useragent.is(opera).safari.should.be.false
      useragent.is(opera).firefox.should.be.false
      useragent.is(opera).mozilla.should.be.false
      useragent.is(opera).ie.should.be.false
      useragent.is(opera).opera.should.be.true
      useragent.is(opera).mobile_safari.should.be.false
    })

    it('should correctly detect safari', function () {
      useragent.is(safari).chrome.should.be.false
      useragent.is(safari).webkit.should.be.true
      useragent.is(safari).safari.should.be.true
      useragent.is(safari).firefox.should.be.false
      useragent.is(safari).mozilla.should.be.false
      useragent.is(safari).ie.should.be.false
      useragent.is(safari).opera.should.be.false
      useragent.is(safari).mobile_safari.should.be.false
    })

    it('should correctly detect safari-mobile', function () {
      useragent.is(ipod).chrome.should.be.false
      useragent.is(ipod).webkit.should.be.true
      useragent.is(ipod).safari.should.be.true
      useragent.is(ipod).firefox.should.be.false
      useragent.is(ipod).mozilla.should.be.false
      useragent.is(ipod).ie.should.be.false
      useragent.is(ipod).opera.should.be.false
      useragent.is(ipod).mobile_safari.should.be.true
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
