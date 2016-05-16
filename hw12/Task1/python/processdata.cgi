#!/usr/bin/python

import os
import fileinput
import urlparse

print os.environ


if os.environ[ 'REQUEST_METHOD' ] == 'GET':
    data = urlparse.parse_qs( os.environ[ 'QUERY_STRING' ] )
else:
    stream = ''
    for line in fileinput.input():
        stream += line
    data = urlparse.parse_qs( stream )

print 'Content-Type: text/html'
print
print '<html><head><title>Environment Variables Python</title>'
print '</head><body>'
i = 1
while i <= int( data[ 'magicnumber' ][ 0 ] ):
    print '<h1>Hello ' + data[ 'username' ][ 0 ] + ' with a password of '
    print data[ 'password' ][ 0 ] + '!</h1>'
    i += 1
print '</body></html>'

