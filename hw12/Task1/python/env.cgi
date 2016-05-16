#!/usr/bin/python

import os

print 'Content-Type: text/html'
print
print '<html><head><title>Environment Variables Python</title>'
print '<style>'
print 'table { border-collapse: collapse }'
print 'td { border: 1px solid black }'
print 'th, td { padding: 12px }'
print '.header { font-weight: bold; font-size: 120%; }'
print '</style>'
print '</head><body>'

print '<h1>Environment Variables</h1>'

envVars = os.environ
browserVarsKeys = []
serverVarsKeys = []

for key in envVars.keys():
    if 'H' == key[ 0 ] and 'T' == key[ 1 ]  and 'T' == key[ 2 ] and 'P' == key[ 3 ]:
        browserVarsKeys.append( key )
    else:
        serverVarsKeys.append( key )

print '<h2>Browser Variables</h2>'
print '<table>'
print '<tr><td class="header">Variable Name</td><td class="header">Value</td></tr>'
browserVarsKeys.sort()
for key in browserVarsKeys:
    print '<tr><td>' + str( key ) + '</td><td>' + str( envVars[ key ] ) + '</td></tr>'
print '</table>'

print '<h2>Server Variables</h2>'
print '<table>'
print '<tr><td class="header">Variable Name</td><td class="header">Value</td></tr>'
serverVarsKeys.sort()
for key in serverVarsKeys:
    print '<tr><td>' + str( key ) + '</td><td>' + str( envVars[ key ] ) + '</td></tr>'
print '</table>'

print '</body></html>'




