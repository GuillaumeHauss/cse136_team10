#!/usr/bin/node

'use strict'

console.log('Content-Type: text/html\n\n');
console.log('<html>');
console.log('<head>');

// Get a neat timestamp
var date = new Date();
date.setUTCHours(date.getUTCHours() + 17);
var hours = hours = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();
var appm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12;
minutes = minutes < 10 ? ( '0' + minutes ) : minutes;
seconds = seconds < 10 ? ( '0' + seconds ) : seconds;
var time = hours + ':' + minutes + ':'+seconds+' ' + appm; 
console.log('<title>Hello World Node</title>');

// Get a random number from 1 to 16 inclusively
var randomNumber = Math.floor( Math.random() * ( 17 - 1 )) + 1;
var backgroundColorString = '';

// Choose a background color
switch ( randomNumber ){
    case 1: 
	backgroundColorString = 'aqua';
	break;
    case 2: 
	backgroundColorString = 'black';
	break;
    case 3: 
	backgroundColorString = 'fuchsia';
	break;
    case 4: 
	backgroundColorString = 'gray';
	break;
    case 5: 
	backgroundColorString = 'green';
	break;
    case 6: 
	backgroundColorString = 'lime';
	break;
    case 7: 
	backgroundColorString = 'maroon';
	break;
    case 8: 
	backgroundColorString = 'navy';
	break;
    case 9: 
	backgroundColorString = 'olive';
	break;
    case 10: 
	backgroundColorString = 'purple';
	break;
    case 11: 
	backgroundColorString = 'red';
	break;
    case 12: 
	backgroundColorString = 'silver';
	break;
    case 13: 
	backgroundColorString = 'teal';
	break;
    case 14: 
	backgroundColorString = 'white';
	break;
    case 15: 
	backgroundColorString = 'yellow';
	break;
    case 16: 
	backgroundColorString = 'blue';
	break;
}
console.log('<style>');
console.log('body{ background-color: ' + backgroundColorString + '}');
if ( randomNumber === 2 || randomNumber === 16 || randomNumber === 8 ) {
    console.log('h1{ color: white }');
}
console.log('</style>');
console.log('</head>');
console.log('<body>');
console.log('<h1>Hello World from Node @ ' + time + '</h1>');
console.log('</body>');
console.log('</html>');

