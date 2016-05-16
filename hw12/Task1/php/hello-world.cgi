#!/usr/bin/env php
<?php
echo("Content-Type: text/html\n\n");
echo('<html>');
echo('<head>
	<title>Hello World in PHP</title>
      </head>');

$color = array('aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white',  'yellow');
$rd = floor(rand(0,17));
if($rd==1 || $rd==7 || $rd==8 || $rd==10){
echo('<style>
	body{color:white;};
	</style>');
}
echo('<style>
	body{background-color:'.$color[$rd].'};
	</style>');
date_default_timezone_set('America/Los_Angeles');
$date = date('h:i:s a', time());
$res = '<h1>Hello World from PHP @'.$date.'</h1>';
echo('<body>');
echo($res);
echo('</body></html>');
?>
