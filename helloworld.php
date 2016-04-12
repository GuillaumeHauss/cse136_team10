<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Problem 1 in PHP</title>
</head>
<?php
	$color = array('aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white',  'yellow');
	$rd = rand(0,16);

	date_default_timezone_set('America/Los_Angeles');
	$date = date('m/d/Y h:i:s a', time());
	$res = "Hello World from PHP @ ".$date;
	?>
<body style="background-color: <?php echo$color[floor($rd)];?>;">
	<?php
	echo '<h1>'.$res.'</h1>';
	?>
</body>
</html>