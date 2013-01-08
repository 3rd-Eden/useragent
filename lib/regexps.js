exports.browser = [
    { parser: new RegExp("(Thunderbird)/(\\d+)\\.(\\d+)\\.?(\\d+)?") }
  , { parser: new RegExp("(Wget)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)") }
  , { parser: new RegExp("(curl)/(\\d+)\\.(\\d+)\\.(\\d+)"), family: "cURL" }
  , { parser: new RegExp("^(Opera)/(\\d+)\\.(\\d+) \\(Nintendo Wii"), family: "Wii" }
  , { parser: new RegExp("(SeaMonkey|Camino)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)") }
  , { parser: new RegExp("(Pale[Mm]oon)/(\\d+)\\.(\\d+)\\.?(\\d+)?"), family: "Pale Moon (Firefox Variant)" }
  , { parser: new RegExp("(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)"), family: "Firefox Mobile" }
  , { parser: new RegExp("(Fennec)/(\\d+)\\.(\\d+)(pre)"), family: "Firefox Mobile" }
  , { parser: new RegExp("(Fennec)/(\\d+)\\.(\\d+)"), family: "Firefox Mobile" }
  , { parser: new RegExp("Mobile.*(Firefox)/(\\d+)\\.(\\d+)"), family: "Firefox Mobile" }
  , { parser: new RegExp("(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?)"), family: "Firefox ($1)" }
  , { parser: new RegExp("(Firefox)/(\\d+)\\.(\\d+)(a\\d+[a-z]*)"), family: "Firefox Alpha" }
  , { parser: new RegExp("(Firefox)/(\\d+)\\.(\\d+)(b\\d+[a-z]*)"), family: "Firefox Beta" }
  , { parser: new RegExp("(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(a\\d+[a-z]*)"), family: "Firefox Alpha" }
  , { parser: new RegExp("(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(b\\d+[a-z]*)"), family: "Firefox Beta" }
  , { parser: new RegExp("(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?"), family: "Firefox ($1)" }
  , { parser: new RegExp("(Firefox).*Tablet browser (\\d+)\\.(\\d+)\\.(\\d+)"), family: "MicroB" }
  , { parser: new RegExp("(MozillaDeveloperPreview)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?") }
  , { parser: new RegExp("(Flock)/(\\d+)\\.(\\d+)(b\\d+?)") }
  , { parser: new RegExp("(RockMelt)/(\\d+)\\.(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Navigator)/(\\d+)\\.(\\d+)\\.(\\d+)"), family: "Netscape" }
  , { parser: new RegExp("(Navigator)/(\\d+)\\.(\\d+)([ab]\\d+)"), family: "Netscape" }
  , { parser: new RegExp("(Netscape6)/(\\d+)\\.(\\d+)\\.(\\d+)"), family: "Netscape" }
  , { parser: new RegExp("(MyIBrow)/(\\d+)\\.(\\d+)"), family: "My Internet Browser" }
  , { parser: new RegExp("(Opera Tablet).*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?") }
  , { parser: new RegExp("(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)"), family: "Opera Mobile" }
  , { parser: new RegExp("Opera Mobi"), family: "Opera Mobile" }
  , { parser: new RegExp("(Opera Mini)/(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Opera Mini)/att/(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?") }
  , { parser: new RegExp("(webOSBrowser)/(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(webOS)/(\\d+)\\.(\\d+)"), family: "webOSBrowser" }
  , { parser: new RegExp("(wOSBrowser).+TouchPad/(\\d+)\\.(\\d+)"), family: "webOS TouchPad" }
  , { parser: new RegExp("(luakit)"), family: "LuaKit" }
  , { parser: new RegExp("(Lightning)/(\\d+)\\.(\\d+)([ab]?\\d+[a-z]*)") }
  , { parser: new RegExp("(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?) \\(Swiftfox\\)"), family: "Swiftfox" }
  , { parser: new RegExp("(Firefox)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)? \\(Swiftfox\\)"), family: "Swiftfox" }
  , { parser: new RegExp("(rekonq)/(\\d+)\\.(\\d+) Safari"), family: "Rekonq" }
  , { parser: new RegExp("rekonq"), family: "Rekonq" }
  , { parser: new RegExp("(conkeror|Conkeror)/(\\d+)\\.(\\d+)\\.?(\\d+)?"), family: "Conkeror" }
  , { parser: new RegExp("(konqueror)/(\\d+)\\.(\\d+)\\.(\\d+)"), family: "Konqueror" }
  , { parser: new RegExp("(WeTab)-Browser") }
  , { parser: new RegExp("(Comodo_Dragon)/(\\d+)\\.(\\d+)\\.(\\d+)"), family: "Comodo Dragon" }
  , { parser: new RegExp("(YottaaMonitor|BrowserMob|HttpMonitor|YandexBot|Slurp|BingPreview|PagePeeker|ThumbShotsBot|WebThumb|URL2PNG|ZooShot|GomezA|Catchpoint bot|Willow Internet Crawler|Google SketchUp|Read%20Later)") }
  , { parser: new RegExp("(Symphony) (\\d+).(\\d+)") }
  , { parser: new RegExp("(Minimo)") }
  , { parser: new RegExp("(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"), family: "Chrome Mobile" }
  , { parser: new RegExp("(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"), family: "Chrome Mobile iOS" }
  , { parser: new RegExp("(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile"), family: "Chrome Mobile" }
  , { parser: new RegExp("(chromeframe)/(\\d+)\\.(\\d+)\\.(\\d+)"), family: "Chrome Frame" }
  , { parser: new RegExp("(UC Browser)(\\d+)\\.(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(SLP Browser)/(\\d+)\\.(\\d+)"), family: "Tizen Browser" }
  , { parser: new RegExp("(Epiphany)/(\\d+)\\.(\\d+).(\\d+)") }
  , { parser: new RegExp("(SE 2\\.X) MetaSr (\\d+)\\.(\\d+)"), family: "Sogou Explorer" }
  , { parser: new RegExp("(FlyFlow)/(\\d+)\\.(\\d+)"), family: "Baidu Explorer" }
  , { parser: new RegExp("(Pingdom.com_bot_version_)(\\d+)\\.(\\d+)"), family: "PingdomBot" }
  , { parser: new RegExp("(facebookexternalhit)/(\\d+)\\.(\\d+)"), family: "FacebookBot" }
  , { parser: new RegExp("(Twitterbot)/(\\d+)\\.(\\d+)"), family: "TwitterBot" }
  , { parser: new RegExp("(PyAMF)/(\\d+)\\.(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(AdobeAIR|Chromium|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Shiira|Sunrise|Chrome|Flock|Netscape|Lunascape|WebPilot|Vodafone|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iris|UP\\.Browser|Bunjaloo|Google Earth|Raven for Mac)/(\\d+)\\.(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Bolt|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Chrome|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|Vodafone|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|NetNewsWire|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris|Abrowser)/(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\\d+)\\.(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(iCab|Lunascape|Opera|Android|Jasmine|Polaris|BREW) (\\d+)\\.(\\d+)\\.?(\\d+)?") }
  , { parser: new RegExp("(Kindle)/(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Android) Donut"), major: "1", minor: "2" }
  , { parser: new RegExp("(Android) Eclair"), major: "2", minor: "1" }
  , { parser: new RegExp("(Android) Froyo"), major: "2", minor: "2" }
  , { parser: new RegExp("(Android) Gingerbread"), major: "2", minor: "3" }
  , { parser: new RegExp("(Android) Honeycomb"), major: "3" }
  , { parser: new RegExp("(IEMobile)[ /](\\d+)\\.(\\d+)"), family: "IE Mobile" }
  , { parser: new RegExp("(MSIE) (\\d+)\\.(\\d+).*XBLWP7"), family: "IE Large Screen" }
  , { parser: new RegExp("(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*)?") }
  , { parser: new RegExp("(Obigo)InternetBrowser") }
  , { parser: new RegExp("(Obigo)\\-Browser") }
  , { parser: new RegExp("(Obigo|OBIGO)[^\\d]*(\\d+)(?:.(\\d+))?") }
  , { parser: new RegExp("(MAXTHON|Maxthon) (\\d+)\\.(\\d+)"), family: "Maxthon" }
  , { parser: new RegExp("(Maxthon|MyIE2|Uzbl|Shiira)"), major: "0" }
  , { parser: new RegExp("(PLAYSTATION) (\\d+)"), family: "PlayStation" }
  , { parser: new RegExp("(PlayStation Portable)[^\\d]+(\\d+).(\\d+)") }
  , { parser: new RegExp("(BrowseX) \\((\\d+)\\.(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(POLARIS)/(\\d+)\\.(\\d+)"), family: "Polaris" }
  , { parser: new RegExp("(Embider)/(\\d+)\\.(\\d+)"), family: "Polaris" }
  , { parser: new RegExp("(BonEcho)/(\\d+)\\.(\\d+)\\.(\\d+)"), family: "Bon Echo" }
  , { parser: new RegExp("(iPod).+Version/(\\d+)\\.(\\d+)\\.(\\d+)"), family: "Mobile Safari" }
  , { parser: new RegExp("(iPod).*Version/(\\d+)\\.(\\d+)"), family: "Mobile Safari" }
  , { parser: new RegExp("(iPhone).*Version/(\\d+)\\.(\\d+)\\.(\\d+)"), family: "Mobile Safari" }
  , { parser: new RegExp("(iPhone).*Version/(\\d+)\\.(\\d+)"), family: "Mobile Safari" }
  , { parser: new RegExp("(iPad).*Version/(\\d+)\\.(\\d+)\\.(\\d+)"), family: "Mobile Safari" }
  , { parser: new RegExp("(iPad).*Version/(\\d+)\\.(\\d+)"), family: "Mobile Safari" }
  , { parser: new RegExp("(iPod|iPhone|iPad);.*CPU.*OS (\\d+)(?:_\\d+)?_(\\d+).*Mobile"), family: "Mobile Safari" }
  , { parser: new RegExp("(iPod|iPhone|iPad)"), family: "Mobile Safari" }
  , { parser: new RegExp("(AvantGo) (\\d+).(\\d+)") }
  , { parser: new RegExp("(Avant)"), major: "1" }
  , { parser: new RegExp("(QtCarBrowser)"), major: "1" }
  , { parser: new RegExp("^(Nokia)"), family: "Nokia Services (WAP) Browser" }
  , { parser: new RegExp("(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)") }
  , { parser: new RegExp("(NokiaBrowser)/(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(BrowserNG)/(\\d+)\\.(\\d+).(\\d+)"), family: "NokiaBrowser" }
  , { parser: new RegExp("(Series60)/5\\.0"), family: "NokiaBrowser", major: "7", minor: "0" }
  , { parser: new RegExp("(Series60)/(\\d+)\\.(\\d+)"), family: "Nokia OSS Browser" }
  , { parser: new RegExp("(S40OviBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"), family: "Nokia Series 40 Ovi Browser" }
  , { parser: new RegExp("(Nokia)[EN]?(\\d+)") }
  , { parser: new RegExp("(BB10);"), family: "Blackberry WebKit" }
  , { parser: new RegExp("(PlayBook).+RIM Tablet OS (\\d+)\\.(\\d+)\\.(\\d+)"), family: "Blackberry WebKit" }
  , { parser: new RegExp("(Black[bB]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)"), family: "Blackberry WebKit" }
  , { parser: new RegExp("(Black[bB]erry)\\s?(\\d+)"), family: "Blackberry" }
  , { parser: new RegExp("(OmniWeb)/v(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Blazer)/(\\d+)\\.(\\d+)"), family: "Palm Blazer" }
  , { parser: new RegExp("(Pre)/(\\d+)\\.(\\d+)"), family: "Palm Pre" }
  , { parser: new RegExp("(Links) \\((\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(QtWeb) Internet Browser/(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?"), family: "Amazon Silk" }
  , { parser: new RegExp("(AppleWebKit)/(\\d+)\\.?(\\d+)?\\+ .* Safari"), family: "WebKit Nightly" }
  , { parser: new RegExp("(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?.*Safari/"), family: "Safari" }
  , { parser: new RegExp("(Safari)/\\d+") }
  , { parser: new RegExp("(OLPC)/Update(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(OLPC)/Update()\\.(\\d+)"), major: "0" }
  , { parser: new RegExp("(SEMC\\-Browser)/(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Teleca)"), family: "Teleca Browser" }
  , { parser: new RegExp("(MSIE) (\\d+)\\.(\\d+)"), family: "IE" }
  , { parser: new RegExp("(Nintendo 3DS).* Version/(\\d+)\\.(\\d+)(?:\\.(\\w+))") }
  , { parser: new RegExp("(python-requests)/(\\d+)\\.(\\d+)"), family: "Python Requests" }
];

exports.device = [
    { parser: new RegExp("HTC ([A-Z][a-z0-9]+) Build"), family: "HTC $1" }
  , { parser: new RegExp("HTC ([A-Z][a-z0-9 ]+) \\d+\\.\\d+\\.\\d+\\.\\d+"), family: "HTC $1" }
  , { parser: new RegExp("HTC_Touch_([A-Za-z0-9]+)"), family: "HTC Touch ($1)" }
  , { parser: new RegExp("USCCHTC(\\d+)"), family: "HTC $1 (US Cellular)" }
  , { parser: new RegExp("Sprint APA(9292)"), family: "HTC $1 (Sprint)" }
  , { parser: new RegExp("HTC ([A-Za-z0-9]+ [A-Z])"), family: "HTC $1" }
  , { parser: new RegExp("HTC-([A-Za-z0-9]+)"), family: "HTC $1" }
  , { parser: new RegExp("HTC_([A-Za-z0-9]+)"), family: "HTC $1" }
  , { parser: new RegExp("HTC ([A-Za-z0-9]+)"), family: "HTC $1" }
  , { parser: new RegExp("(ADR[A-Za-z0-9]+)"), family: "HTC $1" }
  , { parser: new RegExp("(HTC)") }
  , { parser: new RegExp("(QtCarBrowser)"), family: "Tesla Model S" }
  , { parser: new RegExp("(SamsungSGHi560)"), family: "Samsung SGHi560" }
  , { parser: new RegExp("SonyEricsson([A-Za-z0-9]+)/"), family: "Ericsson $1" }
  , { parser: new RegExp("(KFOT Build)"), family: "Kindle Fire" }
  , { parser: new RegExp("(KFTT Build)"), family: "Kindle Fire HD" }
  , { parser: new RegExp("(KFJWI Build)"), family: "Kindle Fire HD 8.9\" WiFi" }
  , { parser: new RegExp("(KFJWA Build)"), family: "Kindle Fire HD 8.9\" 4G" }
  , { parser: new RegExp("(Kindle Fire)") }
  , { parser: new RegExp("(Kindle)") }
  , { parser: new RegExp("(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?"), family: "Kindle Fire" }
  , { parser: new RegExp("Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; WOWMobile (.+) Build") }
  , { parser: new RegExp("Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build") }
  , { parser: new RegExp("Android[\\- ][\\d]+\\.[\\d]+\\-update1\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build") }
  , { parser: new RegExp("Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build") }
  , { parser: new RegExp("Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; (.+) Build") }
  , { parser: new RegExp("NokiaN([0-9]+)"), family: "Nokia N$1" }
  , { parser: new RegExp("Nokia([A-Za-z0-9\\v-]+)"), family: "Nokia $1" }
  , { parser: new RegExp("NOKIA ([A-Za-z0-9\\-]+)"), family: "Nokia $1" }
  , { parser: new RegExp("Nokia ([A-Za-z0-9\\-]+)"), family: "Nokia $1" }
  , { parser: new RegExp("Lumia ([A-Za-z0-9\\-]+)"), family: "Lumia $1" }
  , { parser: new RegExp("Symbian"), family: "Nokia" }
  , { parser: new RegExp("BB10; ([A-Za-z0-9\\- ]+)\\)"), family: "BlackBerry $1" }
  , { parser: new RegExp("(PlayBook).+RIM Tablet OS"), family: "Blackberry Playbook" }
  , { parser: new RegExp("(Black[Bb]erry [0-9]+);") }
  , { parser: new RegExp("Black[Bb]erry([0-9]+)"), family: "BlackBerry $1" }
  , { parser: new RegExp("(Pre)/(\\d+)\\.(\\d+)"), family: "Palm Pre" }
  , { parser: new RegExp("(Pixi)/(\\d+)\\.(\\d+)"), family: "Palm Pixi" }
  , { parser: new RegExp("(Touchpad)/(\\d+)\\.(\\d+)"), family: "HP Touchpad" }
  , { parser: new RegExp("HPiPAQ([A-Za-z0-9]+)/(\\d+).(\\d+)"), family: "HP iPAQ $1" }
  , { parser: new RegExp("Palm([A-Za-z0-9]+)"), family: "Palm $1" }
  , { parser: new RegExp("Treo([A-Za-z0-9]+)"), family: "Palm Treo $1" }
  , { parser: new RegExp("webOS.*(P160UNA)/(\\d+).(\\d+)"), family: "HP Veer" }
  , { parser: new RegExp("(PlayStation Portable)") }
  , { parser: new RegExp("(PlayStation Vita)") }
  , { parser: new RegExp("(AppleTV)"), family: "AppleTV" }
  , { parser: new RegExp("(iPad) Simulator;") }
  , { parser: new RegExp("(iPad);") }
  , { parser: new RegExp("(iPod);") }
  , { parser: new RegExp("(iPhone) Simulator;") }
  , { parser: new RegExp("(iPhone);") }
  , { parser: new RegExp("acer_([A-Za-z0-9]+)_"), family: "Acer $1" }
  , { parser: new RegExp("acer_([A-Za-z0-9]+)_"), family: "Acer $1" }
  , { parser: new RegExp("Amoi\\-([A-Za-z0-9]+)"), family: "Amoi $1" }
  , { parser: new RegExp("AMOI\\-([A-Za-z0-9]+)"), family: "Amoi $1" }
  , { parser: new RegExp("Asus\\-([A-Za-z0-9]+)"), family: "Asus $1" }
  , { parser: new RegExp("ASUS\\-([A-Za-z0-9]+)"), family: "Asus $1" }
  , { parser: new RegExp("BIRD\\-([A-Za-z0-9]+)"), family: "Bird $1" }
  , { parser: new RegExp("BIRD\\.([A-Za-z0-9]+)"), family: "Bird $1" }
  , { parser: new RegExp("BIRD ([A-Za-z0-9]+)"), family: "Bird $1" }
  , { parser: new RegExp("Dell ([A-Za-z0-9]+)"), family: "Dell $1" }
  , { parser: new RegExp("DoCoMo/2\\.0 ([A-Za-z0-9]+)"), family: "DoCoMo $1" }
  , { parser: new RegExp("([A-Za-z0-9]+)_W\\;FOMA"), family: "DoCoMo $1" }
  , { parser: new RegExp("([A-Za-z0-9]+)\\;FOMA"), family: "DoCoMo $1" }
  , { parser: new RegExp("vodafone([A-Za-z0-9]+)"), family: "Huawei Vodafone $1" }
  , { parser: new RegExp("i\\-mate ([A-Za-z0-9]+)"), family: "i-mate $1" }
  , { parser: new RegExp("Kyocera\\-([A-Za-z0-9]+)"), family: "Kyocera $1" }
  , { parser: new RegExp("KWC\\-([A-Za-z0-9]+)"), family: "Kyocera $1" }
  , { parser: new RegExp("Lenovo\\-([A-Za-z0-9]+)"), family: "Lenovo $1" }
  , { parser: new RegExp("Lenovo_([A-Za-z0-9]+)"), family: "Lenovo $1" }
  , { parser: new RegExp("LG/([A-Za-z0-9]+)"), family: "LG $1" }
  , { parser: new RegExp("LG-LG([A-Za-z0-9]+)"), family: "LG $1" }
  , { parser: new RegExp("LGE-LG([A-Za-z0-9]+)"), family: "LG $1" }
  , { parser: new RegExp("LGE VX([A-Za-z0-9]+)"), family: "LG $1" }
  , { parser: new RegExp("LG ([A-Za-z0-9]+)"), family: "LG $1" }
  , { parser: new RegExp("LGE LG\\-AX([A-Za-z0-9]+)"), family: "LG $1" }
  , { parser: new RegExp("LG\\-([A-Za-z0-9]+)"), family: "LG $1" }
  , { parser: new RegExp("LGE\\-([A-Za-z0-9]+)"), family: "LG $1" }
  , { parser: new RegExp("LG([A-Za-z0-9]+)"), family: "LG $1" }
  , { parser: new RegExp("(KIN)\\.One (\\d+)\\.(\\d+)"), family: "Microsoft $1" }
  , { parser: new RegExp("(KIN)\\.Two (\\d+)\\.(\\d+)"), family: "Microsoft $1" }
  , { parser: new RegExp("(Motorola)\\-([A-Za-z0-9]+)") }
  , { parser: new RegExp("MOTO\\-([A-Za-z0-9]+)"), family: "Motorola $1" }
  , { parser: new RegExp("MOT\\-([A-Za-z0-9]+)"), family: "Motorola $1" }
  , { parser: new RegExp("Philips([A-Za-z0-9]+)"), family: "Philips $1" }
  , { parser: new RegExp("Philips ([A-Za-z0-9]+)"), family: "Philips $1" }
  , { parser: new RegExp("SAMSUNG-([A-Za-z0-9\\-]+)"), family: "Samsung $1" }
  , { parser: new RegExp("SAMSUNG\\; ([A-Za-z0-9\\-]+)"), family: "Samsung $1" }
  , { parser: new RegExp("Softbank/1\\.0/([A-Za-z0-9]+)"), family: "Softbank $1" }
  , { parser: new RegExp("Softbank/2\\.0/([A-Za-z0-9]+)"), family: "Softbank $1" }
  , { parser: new RegExp("(PlayStation3 PPC)"), family: "Playstation 3" }
  , { parser: new RegExp("(hiptop|avantgo|plucker|xiino|blazer|elaine|up.browser|up.link|mmp|smartphone|midp|wap|vodafone|o2|pocket|mobile|pda)"), family: "Generic Smartphone" }
  , { parser: new RegExp("^(1207|3gso|4thp|501i|502i|503i|504i|505i|506i|6310|6590|770s|802s|a wa|acer|acs\\-|airn|alav|asus|attw|au\\-m|aur |aus |abac|acoo|aiko|alco|alca|amoi|anex|anny|anyw|aptu|arch|argo|bell|bird|bw\\-n|bw\\-u|beck|benq|bilb|blac|c55/|cdm\\-|chtm|capi|comp|cond|craw|dall|dbte|dc\\-s|dica|ds\\-d|ds12|dait|devi|dmob|doco|dopo|el49|erk0|esl8|ez40|ez60|ez70|ezos|ezze|elai|emul|eric|ezwa|fake|fly\\-|fly_|g\\-mo|g1 u|g560|gf\\-5|grun|gene|go.w|good|grad|hcit|hd\\-m|hd\\-p|hd\\-t|hei\\-|hp i|hpip|hs\\-c|htc |htc\\-|htca|htcg)"), family: "Generic Feature Phone" }
  , { parser: new RegExp("^(htcp|htcs|htct|htc_|haie|hita|huaw|hutc|i\\-20|i\\-go|i\\-ma|i230|iac|iac\\-|iac/|ig01|im1k|inno|iris|jata|java|kddi|kgt|kgt/|kpt |kwc\\-|klon|lexi|lg g|lg\\-a|lg\\-b|lg\\-c|lg\\-d|lg\\-f|lg\\-g|lg\\-k|lg\\-l|lg\\-m|lg\\-o|lg\\-p|lg\\-s|lg\\-t|lg\\-u|lg\\-w|lg/k|lg/l|lg/u|lg50|lg54|lge\\-|lge/|lynx|leno|m1\\-w|m3ga|m50/|maui|mc01|mc21|mcca|medi|meri|mio8|mioa|mo01|mo02|mode|modo|mot |mot\\-|mt50|mtp1|mtv |mate|maxo|merc|mits|mobi|motv|mozz|n100|n101|n102|n202|n203|n300|n302|n500|n502|n505|n700|n701|n710|nec\\-|nem\\-|newg|neon)"), family: "Generic Feature Phone" }
  , { parser: new RegExp("^(netf|noki|nzph|o2 x|o2\\-x|opwv|owg1|opti|oran|ot\\-s|p800|pand|pg\\-1|pg\\-2|pg\\-3|pg\\-6|pg\\-8|pg\\-c|pg13|phil|pn\\-2|pt\\-g|palm|pana|pire|pock|pose|psio|qa\\-a|qc\\-2|qc\\-3|qc\\-5|qc\\-7|qc07|qc12|qc21|qc32|qc60|qci\\-|qwap|qtek|r380|r600|raks|rim9|rove|s55/|sage|sams|sc01|sch\\-|scp\\-|sdk/|se47|sec\\-|sec0|sec1|semc|sgh\\-|shar|sie\\-|sk\\-0|sl45|slid|smb3|smt5|sp01|sph\\-|spv |spv\\-|sy01|samm|sany|sava|scoo|send|siem|smar|smit|soft|sony|t\\-mo|t218|t250|t600|t610|t618|tcl\\-|tdg\\-|telm|tim\\-|ts70|tsm\\-|tsm3|tsm5|tx\\-9|tagt)"), family: "Generic Feature Phone" }
  , { parser: new RegExp("^(talk|teli|topl|tosh|up.b|upg1|utst|v400|v750|veri|vk\\-v|vk40|vk50|vk52|vk53|vm40|vx98|virg|vite|voda|vulc|w3c |w3c\\-|wapj|wapp|wapu|wapm|wig |wapi|wapr|wapv|wapy|wapa|waps|wapt|winc|winw|wonu|x700|xda2|xdag|yas\\-|your|zte\\-|zeto|aste|audi|avan|blaz|brew|brvw|bumb|ccwa|cell|cldc|cmd\\-|dang|eml2|fetc|hipt|http|ibro|idea|ikom|ipaq|jbro|jemu|jigs|keji|kyoc|kyok|libw|m\\-cr|midp|mmef|moto|mwbp|mywa|newt|nok6|o2im|pant|pdxg|play|pluc|port|prox|rozo|sama|seri|smal|symb|treo|upsi|vx52|vx53|vx60|vx61|vx70|vx80|vx81|vx83|vx85|wap\\-|webc|whit|wmlb|xda\\-|xda_)"), family: "Generic Feature Phone" }
  , { parser: new RegExp("(bot|borg|google(^tv)|yahoo|slurp|msnbot|msrbot|openbot|archiver|netresearch|lycos|scooter|altavista|teoma|gigabot|baiduspider|blitzbot|oegp|charlotte|furlbot|http%20client|polybot|htdig|ichiro|mogimogi|larbin|pompos|scrubby|searchsight|seekbot|semanticdiscovery|silk|snappy|speedy|spider|voila|vortex|voyager|zao|zeal|fast\\-webcrawler|converacrawler|dataparksearch|findlinks)"), family: "Spider" }
];

exports.os = [
    { parser: new RegExp("(Red Hat)") }
  , { parser: new RegExp("(Android) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?") }
  , { parser: new RegExp("(Android)\\-(\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?") }
  , { parser: new RegExp("(Android) Donut"), major: "1", minor: "2" }
  , { parser: new RegExp("(Android) Eclair"), major: "2", minor: "1" }
  , { parser: new RegExp("(Android) Froyo"), major: "2", minor: "2" }
  , { parser: new RegExp("(Android) Gingerbread"), major: "2", minor: "3" }
  , { parser: new RegExp("(Android) Honeycomb"), major: "3" }
  , { parser: new RegExp("(Silk-Accelerated=[a-z]{4,5})"), family: "Android" }
  , { parser: new RegExp("(Windows Phone 6\\.5)") }
  , { parser: new RegExp("(Windows (?:NT 5\\.2|NT 5\\.1))"), family: "Windows XP" }
  , { parser: new RegExp("(XBLWP7)"), family: "Windows Phone OS" }
  , { parser: new RegExp("(Windows NT 6\\.1)"), family: "Windows 7" }
  , { parser: new RegExp("(Windows NT 6\\.0)"), family: "Windows Vista" }
  , { parser: new RegExp("(Windows 98|Windows XP|Windows ME|Windows 95|Windows CE|Windows 7|Windows NT 4\\.0|Windows Vista|Windows 2000)") }
  , { parser: new RegExp("(Windows NT 6\\.2; ARM;)"), family: "Windows RT" }
  , { parser: new RegExp("(Windows NT 6\\.2)"), family: "Windows 8" }
  , { parser: new RegExp("(Windows NT 5\\.0)"), family: "Windows 2000" }
  , { parser: new RegExp("(Windows Phone OS) (\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Windows ?Mobile)"), family: "Windows Mobile" }
  , { parser: new RegExp("(WinNT4.0)"), family: "Windows NT 4.0" }
  , { parser: new RegExp("(Win98)"), family: "Windows 98" }
  , { parser: new RegExp("(Tizen)/(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Mac OS X) (\\d+)[_.](\\d+)(?:[_.](\\d+))?") }
  , { parser: new RegExp("(?:PPC|Intel) (Mac OS X)") }
  , { parser: new RegExp("(CPU OS|iPhone OS) (\\d+)_(\\d+)(?:_(\\d+))?"), family: "iOS" }
  , { parser: new RegExp("(iPhone|iPad|iPod); Opera"), family: "iOS" }
  , { parser: new RegExp("(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)"), family: "iOS" }
  , { parser: new RegExp("(AppleTV)/(\\d+)\\.(\\d+)"), family: "ATV OS X", major: "$1", minor: "$2" }
  , { parser: new RegExp("(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+))?"), family: "Chrome OS" }
  , { parser: new RegExp("(Debian)-(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?") }
  , { parser: new RegExp("(Linux Mint)(?:/(\\d+))?") }
  , { parser: new RegExp("(Mandriva)(?: Linux)?/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?") }
  , { parser: new RegExp("(Symbian[Oo][Ss])/(\\d+)\\.(\\d+)"), family: "Symbian OS" }
  , { parser: new RegExp("(Symbian/3).+NokiaBrowser/7\\.3"), family: "Symbian^3 Anna" }
  , { parser: new RegExp("(Symbian/3).+NokiaBrowser/7\\.4"), family: "Symbian^3 Belle" }
  , { parser: new RegExp("(Symbian/3)"), family: "Symbian^3" }
  , { parser: new RegExp("(Series 60|SymbOS|S60)"), family: "Symbian OS" }
  , { parser: new RegExp("(MeeGo)") }
  , { parser: new RegExp("Symbian [Oo][Ss]"), family: "Symbian OS" }
  , { parser: new RegExp("(BB10);.+Version/(\\d+)\\.(\\d+)\\.(\\d+)"), family: "BlackBerry OS" }
  , { parser: new RegExp("(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?"), family: "BlackBerry OS" }
  , { parser: new RegExp("(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?"), family: "BlackBerry OS" }
  , { parser: new RegExp("(RIM Tablet OS) (\\d+)\\.(\\d+)\\.(\\d+)"), family: "BlackBerry Tablet OS" }
  , { parser: new RegExp("(Play[Bb]ook)"), family: "BlackBerry Tablet OS" }
  , { parser: new RegExp("(Black[Bb]erry)"), family: "Blackberry OS" }
  , { parser: new RegExp("(GoogleTV) (\\d+)\\.(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(GoogleTV)\\/\\d+") }
  , { parser: new RegExp("(webOS|hpwOS)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?"), family: "webOS" }
  , { parser: new RegExp("(SUSE|Fedora|Red Hat|PCLinuxOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(SUSE|Fedora|Red Hat|Puppy|PCLinuxOS|CentOS)/(\\d+)\\.(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Ubuntu|Kindle|Bada|Lubuntu|BackTrack|Red Hat|Slackware)/(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(PlayStation Vita) (\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Windows|OpenBSD|FreeBSD|NetBSD|Ubuntu|Kubuntu|Android|Arch Linux|CentOS|WeTab|Slackware)") }
  , { parser: new RegExp("(Linux)/(\\d+)\\.(\\d+)") }
  , { parser: new RegExp("(Linux|BSD)") }
];