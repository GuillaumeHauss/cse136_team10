#!/usr/bin/env ruby

colors = ["aqua", "black", "blue", "fuchsia", "gray", "green", "lime", "maroon", "navy", "olive", "purple", "red", "silver", "teal", "white", "yellow"]
col = colors.sample; 

time = Time.now.strftime('%H%M%S')
hours = Integer(time[0..1])+17
minutes = time[2..3]
seconds = time[4..5]
if(col=="black")
  colfont = 'white'
else
  colfont = 'black'
end
print "Content-Type: text/html \n\n" 
print '<html><head>'
print "<meta charset='UTF-8'>"
print '<title>Hello World Ruby</title></head>'
print "<style>"
print "body{background-color:#{col};color:#{colfont};}"
print "</style>"
print "<body>"
print "<h2>Hello World from Ruby @ #{hours}:#{minutes}:#{seconds}</h2>"
print '</body>'
print '</html>'
