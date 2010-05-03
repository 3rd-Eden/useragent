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

// zomg, where are we located
sys.puts( 'Server running at http://127.0.0.1:8000/' );