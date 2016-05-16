#!/usr/bin/ruby

require 'cgi'
cgi = CGI.new
userName = cgi['username']
userPassword = cgi['userpassword']
magicNumber = Integer(cgi['magicnumber'])

puts cgi.header("type" => "text/html", "cache_control" => "no-cache, no-store")

for i in 1..magicNumber
	puts "<h2>Hello with a username of #{userName} with a password of #{userPassword}!</h2>"
end
