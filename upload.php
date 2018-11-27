<?php 
	sleep(1);
	// print_r($_FILES);
	$file_name = $_FILES['file']['name'];
	$file_error = $_FILES['file']['error'];
	$file_tmp_name = $_FILES['file']['tmp_name'];
	if (0 < $file_error) {
		echo 'Error: '.$file_error;
	} else {
		// move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/'.$_FILES['file']['name']);
		echo('Successfully uploaded file '.$file_name.'\n');

		// $handle = fopen($file_tmp_name, 'r');
		$csv= file_get_contents($file_tmp_name);
		$array = array_map("str_getcsv", explode("\n", $csv));
		$json = json_encode($array);
		print_r($json);
	}

?>