#!/usr/bin/env php
<?php
echo("Content-Type: text/html\n\n");
echo("<html><head><title>Get vs Post methods in forms PHP</title>
</head><body>");
echo("<h1>Get Form</h1>");
echo("<form action='processdata.cgi' method='get'>
<input type='text' name='username' placeholder='Username' required='true'>
<input type='password' name='password' placeholder='Password' required='true'>
<input type='number' name='magicnumber' placeholder='Magic Number' required='true'>
<input type='submit' value='Submit'>
</form>");

echo("<h1>Post Form</h1>");
echo("<form action='processdata.cgi' method='post'>
<input type='text' name='username' placeholder='Username' required='true' >
<input type='password' name='password' placeholder='Password' required='true'>
<input type='number' name='magicnumber' placeholder='Magic Number' required='true'>
<input type='submit' value='Submit'>
</form>");
echo("</body></html>");
?>
