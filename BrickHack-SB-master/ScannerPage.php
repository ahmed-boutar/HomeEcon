<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Scan and edit Data</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <script src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.15/js/dataTables.bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/js/bootstrap-datepicker.js"></script>
    <link rel="stylesheet" type="text/css" href="css/stylesn.css" />
    <style>
  body
  {
   margin:0;
   padding:0;
   background-color:#f1f1f1;
  }
  .box
  {
   width:1270px;
   padding:20px;
   background-color:#fff;
   border:1px solid #ccc;
   border-radius:5px;
   margin-top:25px;
   box-sizing:border-box;
  }
  </style>
  </head>

  <body>


    <div class="container box">
      <section id="container" class="container">
      <ul id="products">
        
      </ul>
          <h1 align="left">Manual Entry:</h1>
          <form id='manualEntryForm' method="post">
              <input type="text" name="productName" placeholder="input" class="input-box">
              <input type="submit" id="submit" value="Submit">
          </form>
      <div id="interactive" class="viewport"></div>
      <br>
      <button id="submitButton" class="sbmt btn scan">Generate Recipes</button>
      <ul id="resultsDisplay">
        
      </ul>

    </section>

  </div>

    <script src="js/jquery-1.9.0.min.js" type="text/javascript"></script>
    <script src="js/queryTest.js" type="text/javascript"></script>
    <script src="//webrtc.github.io/adapter/adapter-latest.js" type="text/javascript"></script>
    <script src="quag/quagga.js" type="text/javascript"></script>
    <script src="js/live_w_locator.js" type="text/javascript"></script>
  </body>
</html>
  
