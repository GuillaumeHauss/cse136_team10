#!/usr/bin/node

console.log( 'Content-Type: text/html\n' );
console.log( '<html>\n<head>\n<title>Get And Post Forms</title>' );
console.log( '<style>' );
console.log( '</style>' );
console.log( '<body>' );
console.log( '<h1>GET Form </h1>' );
console.log( '<form action="processdata.cgi" method="get">' );
console.log( '<input type="text" name="username" placeholder="Username">' );
console.log( '<input type="password" name="password" placeholder="Password">' );
console.log( '<input type="number" name="magicnumber" placeholder="Magic Number">' );
console.log( '<input type="submit" value="Submit">' );
console.log( '</form>' );
console.log( '<h1>POST Form </h1>' );
console.log( '<form action="processdata.cgi" method="post">' );
console.log( '<input type="text" name="username" placeholder="Username">' );
console.log( '<input type="password" name="password" placeholder="Password">' );
console.log( '<input type="number" name="magicnumber" placeholder="Magic Number">' );
console.log( '<input type="submit" value="Submit">' );
console.log( '</form>' );
console.log( '</body>\n</html>' );

