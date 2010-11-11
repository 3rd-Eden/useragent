#node-useragent

A user agent string parser for Node.js. Based on the Browserscope.org UA parser so we can actually get accurate version numbers of the browsers
instead parsing out the render engine version numbers. 

## Installation

Using the npm package manager

	npm install useragent
	

Through git

	git clone git://github.com/3rd-Eden/node-useragent.git
	
	

## What can it do

I could write a whole story about it, but just fire check out the example `node example.js` and navigate to `http://127.0.0.1:8000/`
In your browser you will see the following ( if you are using Chrome like I did ): 

Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; en-US) AppleWebKit/534.10 (KHTML, like Gecko) Chrome/8.0.559.0 Safari/534.10

userAgent.is
	`{"version":"534.10","webkit":true,"opera":false,"ie":false,"firefox":true,"safari":true,"mobile_safari":false}`
userAgent.parser
	`{"family":"Chrome","V1":"8","V2":"0","V3":"559","match":"Chrome/8.0.559","os":{"match":"OS X 10_6_4","family":"OS X","V1":"10","V2":"6","V3":"4"}}`
userAgent response.pretty
	`Chrome 8.0.559`
userAgent response.prettyOs
	`OS X 10.6.4`

As you can see in the example above, there are different ways of parsing the user-agent string. Usually using .browser() would be enough to do some low level user-agent targeting. It parses it in a way that most client side libraries would parse the user-agent. This is however not that accurate. As you can see in the in the output above the .browser() tell us the version if 533.8, but the real version of the browser is 4.0.4. 

The .parser() generates a user_agent object, this contains the:
- Browser / Family name.
- Version number information ( V1.V2.V3 ).
- Os object, contains the Family and version numbers.
- Matched string of the user agent.
- pretty(), a method that prints out the browser in pretty string.
- prettyOs, a method that prints out the operating system in a pretty string.
