#!/usr/bin/python

print 'Content-Type: text/html'
print
print '<html><head><title>Environment Variables Python</title>'
print '</head><body>'
print '<h1>Get Form</h1>'
print '<form action="processdata.cgi" method="get">'
print '<input type="text" name="username" placeholder="Username">'
print '<input type="password" name="password" placeholder="Password">'
print '<input type="number" name="magicnumber" placeholder="Magic Number">'
print '<input type="submit" value="Submit">'
print '</form>'
print '<h1>Post Form</h1>'
print '<form action="processdata.cgi" method="get">'
print '<input type="text" name="username" placeholder="Username">'
print '<input type="password" name="password" placeholder="Password">'
print '<input type="number" name="magicnumber" placeholder="Magic Number">'
print '<input type="submit" value="Submit">'
print '</form>'
print '</body></html>'
