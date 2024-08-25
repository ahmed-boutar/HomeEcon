<!DOCTYPE html>
<html lang="en">
<head>
	<title>SB Scanner</title>
	<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
 	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <link rel="stylesheet" type="text/css" href="css/stylesn.css">
  <link rel="stylesheet" type="text/css" href="css/styles.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
</head>

<body class="fullBackground">
<div class="home"> 
<?php include "inc/header.php"; ?> 


    <main class="middle">
     <button onclick="window.location.href='ScannerPage.php'" class=" greener sbmt btn  center-block ">
      <span class="glyphicon glyphicon-camera"></span> Scan and Save!
    </button> 
  </main>




<footer class="d-flex flex-wrap align-content-end">
 Brickhack 2020  
</footer>
  <?php include "inc/scripts.php";?>
  <script>
$('.fullBackground').fullClip({
  images: ['images/wegmans.jpg', 'images/fridge.jpg', 'images/scan.jpg'],
  transitionTime: 1000,
  wait: 3500
});
</script>
</div>
</body>
</html>
