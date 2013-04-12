<?php
include("header.html");
?>
	<script src="js/graph.js"></script>
	<table width='100%' border=0>
		<tr>
			<td colspan='2' align='center'><div id='uvmbysite' style='align: center'></div></td>
		</tr>
		<tr>
			<td width='50%' align='center'><div id='populationUvmMemCpu' style='align: center'></div></td>
			<td width='50%' align='center'><div id='populationUvmMemDisk' style='align: center'></div></td>
		</tr>
		<tr>
			<td width='50%' align='center' ><div id='graphUvmByAllSite' style='min-width: 300px; height: 300px; margin: 0 auto'></div></td>
			<td width='50%' align='center' ><div id='graphVMByAllSite' style='min-width: 300px; height: 300px; margin: 0 auto'></div></td>
		</tr>
		<tr>
			<td width='50%' align='center'><div id='uvmbydate' style='height: 500px; min-width: 500px'></div></td>
			<td width='50%' align='center'><div id='vmbydate' style='height: 500px; min-width: 500px'></div></td>
			<!--<td width='33%' align='center'><div id='graphUvmBySiteBagnolet' style='min-width: 400px; height: 521px; margin: 0; display: none'></div></td>
			<td width='33%' align='center'><div id='graphUvmBySiteSophia' style='min-width: 400px; height: 400px; margin: 0; display: none'></div></td>
			<td width='33%' align='center'><div id='graphUvmBySiteMontsouris' style='min-width: 400px; height: 400px; margin: 0; display: none'></div></td>-->
		</tr>
	</table>
	<div id='graphUvmBySiteImmeuble Gambetta' style='height: 500px; min-width: 500px'></div>
	<div id='graphUvmBySitenone' style='height: 500px; min-width: 500px'></div>

	<div id='graphUvmXenByHT2' style='height: 500px; min-width: 500px'></div>
	<div id='graphUvmXenByBagnolet' style='height: 500px; min-width: 500px'></div>
	<div id='graphUvmXenByMontsouris' style='height: 500px; min-width: 500px'></div>