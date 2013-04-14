<?php
include("header.html");
include("config.inc");
?>
	<script src="js/graphxen.js"></script>

	<div id='ConsommationByBulle' style='width: 100%;'></div><br><br>

<?php


	$ReqListBulle = mysql_query("SELECT distinct(bulle) FROM SrvXen order by bulle ASC");
	echo '<table>';
	echo '<tr>';
	$cpt = 0;
	while($array = mysql_fetch_array($ReqListBulle))
	{
		$cpt = $cpt + 1;
		echo "<td width=50%><div id='Capacity_$array[bulle]'></div></td>";
		if (($cpt % 2) == 0)
			echo '</tr><tr>';
	}
	echo "</tr></table>";
?>