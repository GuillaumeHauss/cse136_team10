#!/usr/bin/node


console.log( 'Content-Type: text/html\n\n' );
console.log( '<html>\n<head>\n<title>Environment Variables</title>' );
console.log( '<style>' );
console.log( 'table { border-collapse: collapse }' );
console.log( 'td { border: 1px solid black }' );
console.log( 'th, td { padding: 12px; }' );
console.log( '.header { font-weight: bold; font-size: 120%; }' );
console.log( '</style>' );
console.log( '\n</head>\n<body>');

// Get Environment Varibles
const unsortedEnvVarObj = process.env;
const environmentVariableObject = {};
Object.keys( unsortedEnvVarObj ).sort().forEach( function( key ) {
  environmentVariableObject[ key ] = unsortedEnvVarObj[ key ];
});


console.log( '<h1>Environment Variables</h1>');

// Convert the object to an array
var keys = Object.keys( environmentVariableObject );
	
var browserVars = [];
var serverVars = [];

// Iterate through the array getting the browser variables
for( var i = 0 ; i < keys.length ; i++ ){
	var key = keys[ i ];
	var value = environmentVariableObject[ keys[ i ] ];
	var line = key + '=' + value;
	
    var charArray = key.split('');
    if ( charArray[ 0 ] === 'H' && charArray[ 1 ] === 'T' && charArray[ 2 ] === 'T'
        && charArray[ 3 ] === 'P' ){
        // Variable must be a browser variable
        browserVars.push( line );
    } else {
        // Variable must be a server variable
        serverVars.push( line );
    }
}
console.log( '<h2>Browser Variables</h2>');
console.log( '<table>');
console.log( '<tr><td class="header">Variable Name</td><td class="header">Value</td></tr>' );
for( var i = 0 ; i < browserVars.length ; i++ ){
    var splitVariableString = browserVars[ i ].split( '=' );
    var variable = splitVariableString[ 0 ];
    var value = splitVariableString[ 1 ];
    console.log( '<tr><td>' + variable + '</td>' );
    console.log( '<td>' + value + '</td></tr>' );
}
console.log( '</table>' );

console.log( '<h2>Server Variables</h2>');
console.log( '<table>');
console.log( '<tr><td class="header">Variable Name</td><td class="header">Value</td></tr>' );
for( var i = 0 ; i < serverVars.length ; i++ ){
    var splitVariableString = serverVars[ i ].split( '=' );
    var variable = splitVariableString[ 0 ];
    var value = splitVariableString[ 1 ];
    console.log( '<tr><td>' + variable + '</td>' );
    console.log( '<td>' + value + '</td></tr>' );
}
console.log( '</table>\n</body>\n</html>' );
