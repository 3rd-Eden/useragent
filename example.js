var http = require( 'http' ),
		userAgent = require( './useragent' );

http.createServer(function( request, response ){
	
	// creates a parsed down userAgent Object
	var userAgentString = request.headers['user-agent'],
			ua_obj = userAgent.parser( userAgentString ),
			is = userAgent.browser( userAgentString ),
			content = "";
	
	// generate some body
	content += "<h1>{ua}</h1>"
	content += "<dl>";
		content += "<dt>userAgent.is</dt><dd>{is}</dd>";
		content += "<dt>userAgent.parser</dt><dd>{ua_obj}</dd>";
		content += "<dt>userAgent response.pretty</dt><dd>{pretty}</dd>";
		content += "<dt>userAgent response.prettyOs</dt><dd>{prettyOs}</dd>";
	content += "</dl>";
	
	// write out the response
	response.writeHead( 200, {'Content-Type': 'text/html'});
	response.end(
		// easy variable replacement
		content.replace( "{ua}", userAgentString )
					 .replace( "{ua_obj}", JSON.stringify( ua_obj ) )
					 .replace( "{is}", JSON.stringify( is ) )
					 .replace( "{pretty}", ua_obj.pretty() )
					 .replace( "{prettyOs}", ua_obj.prettyOs() )
	);

}).listen( 8000 );

// Display connection information
console.log( 'Server running at http://127.0.0.1:8000/' );