<?php $pageTitle="About Us"; ?>
<?php include "inc/html-top.php"; ?>

<body class="container-fluid">

<?php include "inc/header.php"; ?>
<div class="jumbotron">
<div class="row">
<div class="col-sm-6 text-center">
  <img src="images/purpose.png" width="300" height="281" alt="Purpose">
  <h1>What is this about?</h1>
  <p>This web app aims to help people find the most affordable recipe they could make based on the food they own in their houses. By scanning the barcode of the item or by manually typing the item, our algorithm finds the recipe that you could make from a database +150 Wegmans recipes. If you are missing an item, the app will suggest the next best recipe that requires you to buy the least additional numbers of items.</p>
</div>

<div class="col-sm-6 text-center ">
<img src="images/background.png" width="300" height="281" alt="Background" >
  <h1>Background</h1>
      <p>We are a team of three college students that decided to create an app that would not only help people spend less money on food by providing the most affordable recipe for them. This solution is also helpful for any college student, since meal prep has always an issue.</p>
</div>
</div>
</div>
<div class="row">
<section id ="contact" class="col-sm-12"><a name='contact'></a>
    <h1><i class="glyphicon glyphicon-envelope"></i>Leave us a Message</h1>
    <form action="#">
      <div class="form-group">
      <div class="col-xs-4">
      <label for="fn">First Name:</label>
      <input type="text" class="form-control" id="fn" placeholder="Enter first name"  name="fn">
      </div>
    </div>
    <div class="form-group">
    <div class="col-xs-4">
      <label for="ln">Last Name:</label>
      <input type="text" class="form-control" id="ln" placeholder="Enter last name" name="ln">
    </div>
  </div>
    <div class="form-group">
    <div class="col-xs-4">
      <label for="email">Email:</label>
      <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
    </div>
  </div>
  
    <div class="form-group">
      <label for="message">Message:</label>
      <input type="text" class="form-control" id="message" placeholder="Enter Message" name="message">
    </div>
    
    </div>
    <button type="submit" class="sbmt btn">Submit</button>
  </form>
</section>
</div>
<?php include "inc/scripts.php";?>
</body>

</html>