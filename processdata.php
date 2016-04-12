<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Process Data in PHP</title>
</head>
<body>
	<?php
	if (isset($_GET['username_get']) && isset($_GET['userpassword_get']) && isset($_GET['magicnumber_get'])){
		$num = $_GET['magicnumber_get'];
		$name = $_GET['username_get'];
		$pw = $_GET['userpassword_get'];
		
		for($k = 1; $k<=$num ; $k++){
		$res = "Hello ".$name." with a password of ".$pw ."!";
		echo $res;
		?>
		<br/>
		<?php	
		}
	}
	else{
		if (isset($_POST['username_post']) && isset($_POST['userpassword_post']) && isset($_POST['magicnumber_post'])){
		$num = $_POST['magicnumber_post'];
		$name = $_POST['username_post'];
		$pw = $_POST['userpassword_post'];
		
			for($k = 1; $k<=$num ; $k++){
			$res = "Hello ".$name." with a password of ".$pw ."!";
			echo $res;
			?>
			<br/>
			<?php	
			}
		}
		else{
			echo "The form has not been filled up properly.";
		}
	}
	
?>
</body>
</html>
