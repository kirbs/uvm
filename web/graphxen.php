<?php
include("header.html");
include("config.inc");
?>
	<script src="js/graphxen.js"></script>

	<div id='ConsommationByBulle' style='width: 100%;'></div><br><br>

<?php


	$ReqListBulle = mysql_query("SELECT distinct(bulle) FROM SrvXen order by bulle ASC");
	while($array = mysql_fetch_array($ReqListBulle))
	{
		echo "<div id='Capacity_$array[bulle]' style='width: 50%;'></div><br><br>";
	}
?>