<?php
include("header.html");
include("config.inc");
?>
	<script src="js/graphxen.js"></script>

	<div id='ConsommationByBulle' style='width: 100%;'></div><br><br>

<?php


	$ReqListBulle = mysql_query("SELECT distinct(bulle) FROM SrvXen order by bulle ASC");
	//echo '<table>';
	//echo "<tr><td width='50%'></td><td width='50%'></td></tr>";
	//$cpt = 0;
	echo "<table>";
	while($array = mysql_fetch_array($ReqListBulle))
	{
		echo "<tr><td align='center' width='80%'><div id='Capacity_$array[bulle]' style='min-width: 80%; margin: 0 auto'></div></td></tr>";
		//$cpt = $cpt + 1;
		//if (($cpt % 2) != 0)
		//	echo '<tr>';
		//echo "<td><div id='Capacity_$array[bulle]' style='width: 50%;'></div></td>";
		//if (($cpt % 2) == 0)
		//	echo '</tr>';
	}
	//echo "</table>";
?>