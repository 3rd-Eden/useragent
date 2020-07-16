describe('useragent', function () {
  'use strict';

  var useragent = require('../')
    , assume = require('assume')
    , ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.24 Safari/535.2";

  it('should expose the current version number', function () {
    assume(useragent.version).matches(/^\d+\.\d+\.\d+$/);
  });

  it('should expose the Agent interface', function () {
    assume(useragent.Agent).is.a('function');
  });

  it('should expose the OperatingSystem interface', function () {
    assume(useragent.OperatingSystem).is.a('function');
  });

  it('should expose the Device interface', function () {
    assume(useragent.Device).is.a('function');
  });

  it('should expose the dictionary lookup', function () {
    assume(useragent.lookup).is.a('function');
  });

  it('should expose the parser', function () {
    assume(useragent.parse).is.a('function');
  });

  it('should expose the useragent tester', function () {
    assume(useragent.is).is.a('function')
  });

  describe('#parse', function () {
    it('correctly transforms everything to the correct instances', function () {
      var agent = useragent.parse(ua);

      assume(agent).is.instanceOf(useragent.Agent);
      assume(agent.os).is.instanceOf(useragent.OperatingSystem);
      assume(agent.device).is.instanceOf(useragent.Device)
    });

    it('correctly parsers the operating system', function () {
      var os = useragent.parse(ua).os;

      assume(os.toString()).equals('Mac OS X 10.7.1');
      assume(os.toVersion()).equals('10.7.1');
      assume(JSON.stringify(os)).equals('{"family":"Mac OS X","major":"10","minor":"7","patch":"1"}');

      assume(os.major).equals('10');
      assume(os.minor).equals('7');
      assume(os.patch).equals('1');
    });

    it('should not throw errors when no useragent is given', function () {
      var agent = useragent.parse();

      assume(agent.family).equals('Other');
      assume(agent.major).equals('0');
      assume(agent.minor).equals('0');
      assume(agent.patch).equals('0');

      assume(agent.os.toString()).equals('Other 0.0.0');
      assume(agent.toVersion()).equals('0.0.0');
      assume(agent.toString()).equals('Other 0.0.0 / Other 0.0.0');
      assume(agent.toAgent()).equals('Other 0.0.0');
      assume(JSON.stringify(agent)).equals('{"family":"Other","major":"0","minor":"0","patch":"0","device":{"family":"Other","major":"0","minor":"0","patch":"0"},"os":{"family":"Other","major":"0","minor":"0","patch":"0"}}');
    });

    it('should not throw errors on empty strings and default to unkown', function () {
      var agent = useragent.parse('');

      assume(agent.family).equals('Other');
      assume(agent.major).equals('0');
      assume(agent.minor).equals('0');
      assume(agent.patch).equals('0');

      assume(agent.os.toString()).equals('Other 0.0.0');
      assume(agent.toVersion()).equals('0.0.0');
      assume(agent.toString()).equals('Other 0.0.0 / Other 0.0.0');
      assume(agent.toAgent()).equals('Other 0.0.0');
      assume(JSON.stringify(agent)).equals('{"family":"Other","major":"0","minor":"0","patch":"0","device":{"family":"Other","major":"0","minor":"0","patch":"0"},"os":{"family":"Other","major":"0","minor":"0","patch":"0"}}');
    });

    it('should correctly parse chromes user agent', function () {
      var agent = useragent.parse(ua);

      assume(agent.family).equals('Chrome');
      assume(agent.major).equals('15');
      assume(agent.minor).equals('0');
      assume(agent.patch).equals('874');

      assume(agent.os.toString()).equals('Mac OS X 10.7.1');
      assume(agent.toVersion()).equals('15.0.874');
      assume(agent.toString()).equals('Chrome 15.0.874 / Mac OS X 10.7.1');
      assume(agent.toAgent()).equals('Chrome 15.0.874');
      assume(JSON.stringify(agent)).equals('{"family":"Chrome","major":"15","minor":"0","patch":"874","device":{"family":"Mac","major":"0","minor":"0","patch":"0"},"os":{"family":"Mac OS X","major":"10","minor":"7","patch":"1"}}');
    });

    it('correctly parses iOS8', function () {
      var agent = useragent.parse('Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4');

      assume(agent.os.family).equals('iOS');
      assume(agent.os.major).equals('8');
    });

    it('correctly parses Chromecast', function () {
      var agent = useragent.parse('Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.84 Safari/537.36 CrKey/1.22.74257');

      assume(agent.os.family).equals('Chromecast');
      assume(agent.os.major).equals('1');
      assume(agent.os.minor).equals('22');
      assume(agent.os.patch).equals('74257');
    });
  });

  describe('#fromJSON', function () {
    it('should re-generate the Agent instance', function () {
      var agent = useragent.parse(ua)
        , string = JSON.stringify(agent)
        , agent2 = useragent.fromJSON(string);

      assume(agent2.family).equals(agent.family);
      assume(agent2.major).equals(agent.major);
      assume(agent2.minor).equals(agent.minor);
      assume(agent2.patch).equals(agent.patch);

      assume(agent2.device.family).equals(agent.device.family);

      assume(agent2.os.family).equals(agent.os.family);
      assume(agent2.os.major).equals(agent.os.major);
      assume(agent2.os.minor).equals(agent.os.minor);
      assume(agent2.os.patch).equals(agent.os.patch);
    });

    it('should also work with legacy JSON', function () {
      var agent = useragent.fromJSON('{"family":"Chrome","major":"15","minor":"0","patch":"874","os":"Mac OS X"}');

      assume(agent.family).equals('Chrome');
      assume(agent.major).equals('15');
      assume(agent.minor).equals('0');
      assume(agent.patch).equals('874');

      assume(agent.device.family).equals('Other');

      assume(agent.os.family).equals('Mac OS X');
    });
  });

  describe('#is', function () {
    var chrome = ua
      , firefox = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:8.0) Gecko/20100101 Firefox/8.0'
      , ie = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; yie8)'
      , ie11 = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'
      , opera = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; de) Opera 11.51'
      , safari = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; da-dk) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1'
      , ipod = 'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; ja-jp) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5'
      , android = 'Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus S Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
      , chromecast = 'Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.84 Safari/537.36 CrKey/1.22.74257';

    it('should not throw errors when called without arguments', function () {
      useragent.is();
      useragent.is('');
    });

    it('should correctly detect google chrome', function () {
      assume(useragent.is(chrome).chrome).equals(true);
      assume(useragent.is(chrome).webkit).equals(true);
      assume(useragent.is(chrome).safari).equals(false);
      assume(useragent.is(chrome).firefox).equals(false);
      assume(useragent.is(chrome).mozilla).equals(false);
      assume(useragent.is(chrome).ie).equals(false);
      assume(useragent.is(chrome).opera).equals(false);
      assume(useragent.is(chrome).mobile_safari).equals(false);
      assume(useragent.is(chrome).android).equals(false);
    });

    it('should correctly detect firefox', function () {
      assume(useragent.is(firefox).chrome).equals(false);
      assume(useragent.is(firefox).webkit).equals(false);
      assume(useragent.is(firefox).safari).equals(false);
      assume(useragent.is(firefox).firefox).equals(true);
      assume(useragent.is(firefox).mozilla).equals(true);
      assume(useragent.is(firefox).ie).equals(false);
      assume(useragent.is(firefox).opera).equals(false);
      assume(useragent.is(firefox).mobile_safari).equals(false);
      assume(useragent.is(firefox).android).equals(false);
    });

    it('should correctly detect internet explorer', function () {
      assume(useragent.is(ie).chrome).equals(false);
      assume(useragent.is(ie).webkit).equals(false);
      assume(useragent.is(ie).safari).equals(false);
      assume(useragent.is(ie).firefox).equals(false);
      assume(useragent.is(ie).mozilla).equals(false);
      assume(useragent.is(ie).ie).equals(true);
      assume(useragent.is(ie).opera).equals(false);
      assume(useragent.is(ie).mobile_safari).equals(false);
      assume(useragent.is(ie).android).equals(false);

      assume(useragent.is(ie11).chrome).equals(false);
      assume(useragent.is(ie11).webkit).equals(false);
      assume(useragent.is(ie11).safari).equals(false);
      assume(useragent.is(ie11).firefox).equals(false);
      assume(useragent.is(ie11).mozilla).equals(false);
      assume(useragent.is(ie11).ie).equals(true);
      assume(useragent.is(ie11).opera).equals(false);
      assume(useragent.is(ie11).mobile_safari).equals(false);
      assume(useragent.is(ie11).android).equals(false);
    });

    it('should correctly detect opera', function () {
      assume(useragent.is(opera).chrome).equals(false);
      assume(useragent.is(opera).webkit).equals(false);
      assume(useragent.is(opera).safari).equals(false);
      assume(useragent.is(opera).firefox).equals(false);
      assume(useragent.is(opera).mozilla).equals(false);
      assume(useragent.is(opera).ie).equals(false);
      assume(useragent.is(opera).opera).equals(true);
      assume(useragent.is(opera).mobile_safari).equals(false);
      assume(useragent.is(opera).android).equals(false);
    });

    it('should correctly detect safari', function () {
      assume(useragent.is(safari).chrome).equals(false);
      assume(useragent.is(safari).webkit).equals(true);
      assume(useragent.is(safari).safari).equals(true);
      assume(useragent.is(safari).firefox).equals(false);
      assume(useragent.is(safari).mozilla).equals(false);
      assume(useragent.is(safari).ie).equals(false);
      assume(useragent.is(safari).opera).equals(false);
      assume(useragent.is(safari).mobile_safari).equals(false);
      assume(useragent.is(safari).android).equals(false);
    });

    it('should correctly detect safari-mobile', function () {
      assume(useragent.is(ipod).chrome).equals(false);
      assume(useragent.is(ipod).webkit).equals(true);
      assume(useragent.is(ipod).safari).equals(true);
      assume(useragent.is(ipod).firefox).equals(false);
      assume(useragent.is(ipod).mozilla).equals(false);
      assume(useragent.is(ipod).ie).equals(false);
      assume(useragent.is(ipod).opera).equals(false);
      assume(useragent.is(ipod).mobile_safari).equals(true);
      assume(useragent.is(ipod).android).equals(false);
    });

    it('should correctly detect android', function () {
      assume(useragent.is(android).chrome).equals(false);
      assume(useragent.is(android).webkit).equals(true);
      assume(useragent.is(android).safari).equals(true);
      assume(useragent.is(android).firefox).equals(false);
      assume(useragent.is(android).mozilla).equals(false);
      assume(useragent.is(android).ie).equals(false);
      assume(useragent.is(android).opera).equals(false);
      assume(useragent.is(android).mobile_safari).equals(true);
      assume(useragent.is(android).android).equals(true);
    });

    it('should correctly detect chromecast', function () {
      assume(useragent.is(chromecast).chrome).equals(true);
      assume(useragent.is(chromecast).webkit).equals(true);
      assume(useragent.is(chromecast).safari).equals(false);
      assume(useragent.is(chromecast).firefox).equals(false);
      assume(useragent.is(chromecast).mozilla).equals(false);
      assume(useragent.is(chromecast).ie).equals(false);
      assume(useragent.is(chromecast).opera).equals(false);
      assume(useragent.is(chromecast).mobile_safari).equals(false);
      assume(useragent.is(chromecast).android).equals(false);
    });
  });
});
