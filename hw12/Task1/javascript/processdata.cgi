#!/usr/bin/node

var cgi = require( './cgi.js' );
var qs = require( 'querystring' );

var data = {};

var global = this;

var environmentVariables = process.env;
var requestMethod = environmentVariables[ 'REQUEST_METHOD' ];

console.log( 'Content-Type: text/html\n' );
console.log( '<html>\n<head>\n<title>Process Data</title>' );
console.log( '<style>' );
console.log( '</style>' );
console.log( '<body>' );

if ( requestMethod === 'GET' ) {
	data = qs.parse( environmentVariables[ 'QUERY_STRING' ] );
	finishTemplate( data );
} else {
    // Must be a POST request
    var streamData = '';
    var stdin = process.stdin;
    stdin.resume();

    stdin.on('data', function (chunk) {
        streamData += chunk;
    });

    process.stdin.on('end', function () {
        data = qs.parse(streamData);
        finishTemplate(data);
    });
}



function finishTemplate( data ) {
	for ( var i = 0 ; i < parseInt( data[ 'magicnumber' ] ) ; i++ ) {
        console.log( '<h1>Hello ' + data[ 'username' ] + ' with a password of ' );
        console.log( data[ 'password' ] +  '!</h1>' );
	}
	console.log( '</body>\n</html>' );
}
