<!doctype html>
<html lang="en">
<head>
  <title>Weather Report</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

  <!-- jQuery library -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

  <!-- Latest compiled JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  
  <!--custome created CSS file-->
  <link rel="stylesheet" href="css/styles.css">
</head>

<body onload="defaultWeatherReport()">
	<div id="loader" class="loader">Please wait...</div>
	<div class="well text-center">
		<h1>Weather Report</h1>
	</div>
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<p><em>Please enter CITY name in below search box to get the weather report..</em></p>
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding-left-0">
					<input type="text" id="cityname" name="cityname" placeholder="city name" maxlength="30" class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
					<button type="button" class="btn btn-primary" onclick="searchWeatherReport()">Search</button>
				</div>
			</div>
		</div>
		<div class="row">
			<div id="searchText" class="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 overflow-x-auto">
				<table class="table table-striped table-bordered">
					<thead>
						<tr>
						  <th>DAY</th>
						  <th>DISCRIPTION</th>
						  <th>TEMP (&deg;C)</th>
						  <th>WIND (km/h)</th>
						  <th>HUMIDITY</th>
						</tr>
					</thead>
					<tbody id="tbody">
						
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="well text-right margin-bottom-0">
		<p>Copyright Wipro &copy; 2017.</p>
	</div>
  <!--custome created JS file-->
  <script src="js/scripts.js"></script>
</body>
</html>
