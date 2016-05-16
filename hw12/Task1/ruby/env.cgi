#!/usr/bin/ruby

serverVars = Hash.new
clientVars = Hash.new

ENV.each do |i, v|
  if i.start_with?('HTTP')
    clientVars[i] = v
  else
    serverVars[i] = v
  end
end

clientVars = clientVars.sort.to_h
serverVars = serverVars.sort.to_h

print "Content-Type: text/html charset=UTF8 \n\n"
puts "<!DOCTYPE html>"
print "<html><head>"
print "<meta charset=\"UTF-8\">"
print '<title>Hello World Ruby</title></head>'

print "<p>Client Variables</p>"
print "<table border=\"1\">"
print "<tr> <td>Variable name</td> <td>Value</td> </tr>"
clientVars.each do |i, v|
  puts "<tr> <td>#{i}</td> <td> #{v} </td> </tr>"
end

print "</table>"

print "<p>Server Variables</p>"
print "<table border=\"1\">"
print "<tr> <td>Variable name</td> <td>Value</td> </tr>"
serverVars.each do |i, v|
  puts "<tr> <td>#{i}</td> <td> #{v} </td> </tr>"
end
print "</table>"

print "</html>"

