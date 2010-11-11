var fs = require('fs'),
    sys = require('sys'),
	useragent = require('../useragent');

fs.readFile( './useragents/user_agent_data.csv', function( err, result ){
	
	if( err )
		return sys.puts( "can't locate file" );

	// split file in single rows
	var results = result.split( "\n" ), i = results.length,
			// start times
		total, start = ( new Date() ).valueOf(), failed = [];

	while( i-- ){
		(function( ua, res ){
			var agent = useragent.parser( ua.toString().replace( /\"/g, "" ) );

			if( !agent || !agent.pretty() || !agent.match ){
				failed[ failed.length ] = Array.prototype.concat.call( arguments, [] ).join(",");
				sys.puts( JSON.stringify( agent ) );
				sys.puts( agent.pretty() )
				sys.puts( ua  + "\n");
			}

		}( results[i].split( "," ) ))
	};

	// report 
	if( failed.length ){
		sys.puts( "Failed " + failed.length + " out of " + results.length + " tests." );
	} else {
		sys.puts( "\\o/ yay, passed all " + results.length + " tests \\o/" );
	}
	
	sys.puts( "Executed in " + (( new Date()).valueOf() - start) + " ms");
});