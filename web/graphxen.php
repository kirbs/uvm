<?php
include("header.html");
include("config.inc");
?>
	<script src="js/graphxen.js"></script>

<?php

	$ReqListBulle = mysql_query("SELECT distinct(bulle) FROM SrvXen order by bulle ASC");
	while($array = mysql_fetch_array($ReqListBulle))
	{
		echo "<div id='Capacity_$array[bulle]'></div><br><br>";
	}
?>