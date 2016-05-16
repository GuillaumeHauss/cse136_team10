#!/usr/bin/env php
<?php

echo("Content-Type: text/html\n\n");
echo('<html>
<head>
	
	<title>Variables in PHP</title>
</head>
<body>
	<h2>Environment variables reached out using PHP</h2>');

$indicesVar = array('PHP_SELF', 
'argv', 
'argc',
'AUTH_TYPE',
'APP_ENGINE',
'APP_ENGINE_VERSION',
'CFG_CLUSTER', 
'DOCUMENT_ROOT',
'ENVIRONMENT',
'FCGI_ROLE',
'GATEWAY_INTERFACE',
'GEOIP_COUNTRY_CODE',
'GEOIP_COUNTRY_NAME',
'GEOIP_REGION',
'GEOIP_CITY',
'GEOIP_DMA_CODE',
'GEOIP_AREA_CODE',
'GEOIP_LATITUDE',
'GEOIP_LONGITUDE',
'HTTP_ACCEPT', 
'HTTP_ACCEPT_CHARSET', 
'HTTP_ACCEPT_ENCODING', 
'HTTP_ACCEPT_LANGUAGE', 
'HTTP_CONNECTION',
'HTTP_COOKIE', 
'HTTP_HOST', 
'HTTP_REFERER', 
'HTTP_REMOTE_IP',
'HTTP_UPGRADE_INSECURE_REQUESTS',
'HTTP_USER_AGENT',
'HTTP_X_CDN_GEO',
'HTTP_X_CDN_GEO_IP',
'HTTP_X_CDN_UA',
'HTTP_X_REMOTE_PORT',
'HTTP_X_REMOTE_IP',
'HTTP_X_FORWARDED_FOR',
'HTTP_X_FORWARDED_HOST',
'HTTP_X_FORWARDED_SERVER',
'HTTPS', 
'ORIG_PATH_INFO',
'PATH_INFO',
'PATH_TRANSLATED', 
'PHP_AUTH_DIGEST', 
'PHP_AUTH_USER', 
'PHP_AUTH_PW', 
'QUERY_STRING', 
'REDIRECT_REMOTE_USER', 
'REMOTE_ADDR', 
'REMOTE_HOST', 
'REMOTE_PORT', 
'REMOTE_USER', 
'REQUEST_URI',
'REQUEST_METHOD', 
'REQUEST_TIME', 
'REQUEST_TIME_FLOAT',
'SCRIPT_FILENAME', 
'SERVER_ADDR', 
'SERVER_NAME', 
'SERVER_SOFTWARE', 
'SERVER_PROTOCOL', 
'SCRIPT_NAME',
'SCRIPT_FILENAME',
'SCRIPT_URL',
'SCRIPT_URI',
'SERVER_ADMIN', 
'SERVER_PORT', 
'SERVER_SIGNATURE',
'UNIQUE_ID',
'USER'
); 

sort($indicesVar);
$BrowserVar = [];
$ServerVar = [];

//Loop through all the couples of variables to detect the browser variables from the server ones 
foreach ($indicesVar as $arg) { 
    if (isset($_SERVER[$arg])) {
    	$couple = $arg."::".$_SERVER[$arg];
    	if ($arg[0]=='H' && $arg[1]=='T' && $arg[2]=='T' && $arg[3]=='P') {
    	 	$BrowserVar[] = $couple;
    	}
    	else{
    		$ServerVar[] = $couple;
    	}  
    }    
}

//Display into two tables
echo('<h2>Browser Variables</h2>');
echo('<table border=1>');
echo("<tr><td class='header'>Variable Name</td><td class='header'>Value</td></tr>");
for($i=0 ;$i<count($BrowserVar); $i++){
    $splitVariableString = explode('::',$BrowserVar[$i]);
    $variable = $splitVariableString[0];
    $value = $splitVariableString[1];
    echo( '<tr><td>'.$variable.'</td>' );
    echo( '<td>'.$value.'</td></tr>' );
}
echo( '</table>' );
echo "<br/>";
echo "<br/>";

echo('<h2>Server Variables</h2>');
echo('<table border=1>');
echo("<tr><td class='header'>Variable Name</td><td class='header'>Value</td></tr>");
for($i=0 ;$i<count($ServerVar); $i++){
    $splitVariableString = explode('::',$ServerVar[$i]);
    $variable = $splitVariableString[0];
    $value = $splitVariableString[1];
    echo( '<tr><td>'.$variable.'</td>' );
    echo( '<td>'.$value.'</td></tr>' );
    
}
echo( '</table></body>
</html>');
?>
