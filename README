I could start with a rather extensive description, but a working example is more useful:

var sys = require( 'sys' ),
   	http = require( 'http' ),
	userAgent = require( './useragent' );
	
http.createServer(
	function( request, response ){
		// creates a parsed down userAgent Object
  		var ua_obj = userAgent.parser( request.headers['user-agent'] ),
		
		// the common know JS library ua parser, which makes it easier to target the most common browsers
		is = userAgent.browser( request.headers['user-agent'] ),
		content = "";
		
		content += is.webkit ? "Hello Webkit" : is.firefox ? "Hello Firefox" : "Hello Other";
		content += "<br />is:" + JSON.stringify( is );
		content += "<br />ua_obj:" + JSON.stringify( ua_obj );
		
		response.writeHead( 200, {'Content-Type': 'text/html'});
		response.end(  content );
 
	}
).listen( 8000 );


Browse with your browser of choice to your node server, in my case a WebKit nightly:

Hello Webkit
is:{"version":"533.8","webkit":true,"opera":false,"ie":false,"firefox":false,"chrome":false,"mobile_safari":false}
ua_obj:{"family":"Safari","V1":"4","V2":"0","V3":"4","match":"Version/4.0.4 Safari/"}


As you can see in the example above, there are different ways of parsing the user-agent string. Usually using .browser() would be enough to do some low level user-agent targeting. It parses it in a way that most client side libraries would parse the user-agent. This is however not that accurate. As you can see in the in the output above the .browser() tell us the version if 533.8, but the real version of the browser is 4.0.4. 

The .parser() generates a user_agent object, this contains the:
- Browser / Family name
- Version number information ( V1.V2.V3 )
- Matched string of the useragent
- pretty(), a method that prints out the useragent in pretty string. 


Please note this parser is a port of the fabulous UA parser: code.google.com/p/ua-parser/ which is also used for browserscope.org