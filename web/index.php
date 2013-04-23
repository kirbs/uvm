<?php

include("header.html");
include("config.inc");


$today = $lastDate;


function formulaire($today)
{
	echo "
	<script src='js/datatable.js'></script>
	<script src='js/calendar.js'></script>

	<script src='js/menu.js'></script>
	<script src='js/panel.js'></script>
	<script src='js/autocomplete.js'></script>
	
	<!-- <script src='jstree/_lib/jquery.js'></script> -->
	<script src='jstree/jquery.jstree.js'></script>
	
	<!--<table><tr>
			<td><div class='yui3-skin-sam' id='simple'></div></td>
			<td><button class='yui3-button' id='openButton'>Pourcentage uVM</button></td>
			</tr>
	</table>

	
	<div id='panelContent' class='yui3-widget-loading'>
    	<div class='yui3-widget-hd'>
        	Graph du Pourcentage d' uVM/VM
    	</div>
    	<div class='yui3-widget-bd'>
			<div id='graphUvmByAllSite' class='yui3-widget-bd' ></div>
			<div id='graphVMByAllSite' class='yui3-widget-bd'></div>
    	</div>
	</div>-->
	
	
<br><br>
<script>
$(function() {
$( '#tabs' ).tabs();
});
</script>

<div id='tabs'>
	<ul>
		<li><a href='#tabs-1'>uvm par PFS</a></li>
		<li><a href='#tabs-2'>Rechercher une VM</a></li>
	</ul>
	<div id='tabs-1'>
		
		<form id='form' method='post' action='index.php'>
		<table width='100%'>
			<tr>
				<td width='30%' align='center'>
	       			<div id='choice_date_click' ></div>
	       		</td>
	       		<td width='70%' align='left'>
			        <input type=hidden name='date' id='choice_date_click_field'>
					<table><tr><td>Vue des uvms par : 
						<select id='datas' name=pfs>
							<option value='--'>-- Choix de la PFS --</option>
							<option value='all'>- ALL -</option>
						</select>
					<input type=hidden name='choix' value='pfs'>
					<input type=hidden name='enab' value=1>
					<!--<input type=hidden name='enab' value=0>-->
					<!--<input type='submit' value='Valider'>-->
					</td></tr></table>
				</td>
			</tr>
		</table>
		</form>";
		//TreeTable_uvm_by_pfs_mere($today);
		echo "
		<div id='demo1'></div>
		
		<div id='template' class='yui3-skin-sam dt-example yui3-g'> <!-- You need this skin class -->
	    	<div class='yui3-u-1-3' id='TableAllUvm'></div>
		</div>
	</div>
	<div id='tabs-2'>

		<div id='demo' class='yui3-skin-sam'>
			<label for='tags'>VM : </label>
			<input size='40' id='tags' />
		</div>
	</div>
</div>";

}

function affiche_liste_pfs($choix,$date)
{
	echo "<form method='post' action='index.php'>
		<table><tr><td>Choix de la pfs : 
		<select name=pfs>
			<option value='all'>ALL</option>";
	        $req_liste_pfs_mere = mysql_query("SELECT distinct(pfs_mere) FROM uVM WHERE date_uvm = '$date' ORDER BY pfs_mere ASC");
	       	while($PFSmere = mysql_fetch_array($req_liste_pfs_mere))
        	{
			 echo "<option value='$PFSmere[pfs_mere]'>$PFSmere[pfs_mere]</option>";
		}
		echo "</select>
		<input type=hidden name='choix' value='$choix'>
		<input type=hidden name='enab' value=1>
		<input type=hidden name='date' value='$date'>
		<input type='submit' value='Valider'>
		</td></tr></table></form>";
}

function liste_uvm_by_xen()
{
	$req_liste_xen = mysql_query("SELECT distinct(srv_xen) FROM uVM");
        echo "<table>";
        while($srv = mysql_fetch_array($req_liste_xen))
	{
		$req_liste_vm_in_xen = mysql_query("SELECT uvm_total FROM uVM WHERE srv_xen  = '$srv[srv_xen]'");
		$cpt = 0;
        	while($uvm_vm = mysql_fetch_array($req_liste_vm_in_xen))
		{
			$cpt = $cpt + $uvm_vm["uvm_total"];
		}
		echo "<tr><td>$srv[srv_xen]</td><td>$cpt uvm</td></tr>";
	}
	echo "</table>";
}






function TreeTable_uvm_by_pfs_mere($date)
{
	$pfs = "all";
	if ($pfs == "all")
		$CONDITION = "WHERE 1 AND date_uvm = '$date'";
	else
		$CONDITION = "WHERE pfs_mere = '$pfs' AND date_uvm = '$date'";
	
	echo "
	<table id='example-basic'>
        <thead>
          <tr>    <div id='main'>
            <th>VM</th>
            <th>uVMs</th>
          </tr>
        </thead>
        <tbody>";
	
	$req_liste_pfs_mere = mysql_query("SELECT distinct(pfs_mere) FROM uVM $CONDITION");
	$cpt_pfs_mere = 1;
	while($PFSmere = mysql_fetch_array($req_liste_pfs_mere))
	{
		$req_UvmByPFSmere = mysql_query("SELECT uvm_total FROM uVM WHERE pfs_mere = '$PFSmere[pfs_mere]' AND date_uvm = '$date' ORDER BY uvm_total DESC");
		$cpt = 0;
		while ($UvmByPFSmere = mysql_fetch_array($req_UvmByPFSmere))
		{
			$cpt = $cpt + $UvmByPFSmere["uvm_total"];
		}
		echo "<tr data-tt-id='$cpt_pfs_mere'>";
		echo "<td>$PFSmere[pfs_mere]</td><td>$cpt</td>";
		echo "</tr>";
		
		
		$req_liste_pfs_fille = mysql_query("SELECT distinct(pfs_fille) FROM uVM WHERE pfs_mere = '$PFSmere[pfs_mere]' AND date_uvm = '$date'");
		$cpt_pfs_fille = 1;
		while($PFSfille = mysql_fetch_array($req_liste_pfs_fille))
		{
			$req_UvmByPFSfille = mysql_query("SELECT uvm_total FROM uVM WHERE pfs_fille = '$PFSfille[pfs_fille]' AND date_uvm = '$date' ORDER BY uvm_total DESC");
			$cpt2 = 0;
			while ($UvmByPFSfille = mysql_fetch_array($req_UvmByPFSfille))
			{
				$cpt2 = $cpt2 + $UvmByPFSfille["uvm_total"];
			}
			    echo "<tr data-tt-id='$cpt_pfs_mere.$cpt_pfs_fille' data-tt-parent-id='$cpt_pfs_mere'>";
				echo "<td>$PFSfille[pfs_fille]</td><td>$cpt2</td>";
				echo "</tr>";
     			
     			
			$resultatvm = mysql_query("SELECT * FROM uVM WHERE pfs_mere = '$PFSmere[pfs_mere]' AND pfs_fille = '$PFSfille[pfs_fille]' AND date_uvm = '$date' ORDER BY uvm_total DESC");
			$cpt_vm = 1;
			while($result = mysql_fetch_array($resultatvm))
			{
				echo "<tr data-tt-id='$cpt_pfs_mere.$cpt_pfs_fille.$cpt_vm' data-tt-parent-id='$cpt_pfs_mere.$cpt_pfs_fille'>";
				echo "<td>$result[vm_name]</td><td>$result[uvm_total]</td>";
				echo "</tr>";

				$cpt_vm = $cpt_vm + 1;
			}
			$cpt_pfs_fille = $cpt_pfs_fille + 1;
		}
		$cpt_pfs_mere = $cpt_pfs_mere + 1;
	}
	echo "</tbody>
    	  </table>
	
	<script>
		$('#example-basic').treetable({ expandable: true });
	</script>";
}









function liste_uvm_by_pfs_mere($pfs, $date)
{
	echo "<table width=50% border=\"0\">";
	if ($pfs == "all")
		$CONDITION = "WHERE 1 AND date_uvm = '$date'";
	else
		$CONDITION = "WHERE pfs_mere = '$pfs' AND date_uvm = '$date'";

	$req_liste_pfs_mere = mysql_query("SELECT distinct(pfs_mere) FROM uVM $CONDITION");
	while($PFSmere = mysql_fetch_array($req_liste_pfs_mere))
	{
		$req_UvmByPFSmere = mysql_query("SELECT uvm_total FROM uVM WHERE pfs_mere = '$PFSmere[pfs_mere]' AND date_uvm = '$date' ORDER BY uvm_total DESC");
		$cpt = 0;
		while ($UvmByPFSmere = mysql_fetch_array($req_UvmByPFSmere))
		{
			$cpt = $cpt + $UvmByPFSmere["uvm_total"];
		}
		echo "<tr>
				<td>
					<div class=\"root\"><a href=\"\" onclick=\"toggleNode(this.parentNode); return false;\">
						<table border=0 width='100%'>
							<tr>
								<td>
									$PFSmere[pfs_mere]
								</td>
								<td align=right>
									$cpt uvm total
								</td>
							</tr>
						</table></a>";
		$req_liste_pfs_fille = mysql_query("SELECT distinct(pfs_fille) FROM uVM WHERE pfs_mere = '$PFSmere[pfs_mere]' AND date_uvm = '$date'");
		while($PFSfille = mysql_fetch_array($req_liste_pfs_fille))
		{
			$req_UvmByPFSfille = mysql_query("SELECT uvm_total FROM uVM WHERE pfs_fille = '$PFSfille[pfs_fille]' AND date_uvm = '$date' ORDER BY uvm_total DESC");
			$cpt2 = 0;
			while ($UvmByPFSfille = mysql_fetch_array($req_UvmByPFSfille))
			{
				$cpt2 = $cpt2 + $UvmByPFSfille["uvm_total"];
			}
     			echo "<div><a href=\"\" onclick=\"toggleNode(this.parentNode); return false;\"><table border=0 width='100%'><tr><td>$PFSfille[pfs_fille]</td><td align=right>$cpt2</td></tr></table></a>";
			$resultatvm = mysql_query("SELECT * FROM uVM WHERE pfs_mere = '$PFSmere[pfs_mere]' AND pfs_fille = '$PFSfille[pfs_fille]' AND date_uvm = '$date' ORDER BY uvm_total DESC");
			while($result = mysql_fetch_array($resultatvm))
			{
				echo " <div>
				<table border=0 width='100%'>
					<tr>
						<td>$result[vm_name]</td>
						<td align=right>$result[uvm_total]</td>
					</tr>
				</table>
				</div>";
			}
			echo "</div>";
		}
		echo "</div></td></tr>";
	}
	echo "</table>";
}

function nombre_element($critere, $today)
{
	
	$req_nombre_elements = mysql_query("SELECT distinct($critere) FROM uVM WHERE date_uvm = '$today'");
	$nombre = mysql_num_rows($req_nombre_elements);
        return $nombre;
}
function nombre_total_uvm($today)
{
	$req_nombre_elements = mysql_query("SELECT uvm_total FROM uVM WHERE date_uvm = '$today'");
        $cpt = 0;
	while($row = mysql_fetch_array($req_nombre_elements))
	{
		$cpt = $cpt + $row["uvm_total"];
	}
        return $cpt;
}

function return_variable($variable)
{
	if (isset($variable))
		$ret = $variable;
	else
		$ret = "";
	return $variable;
}

formulaire($today);
$choix = return_variable($_POST['choix']);
$enab = return_variable($_POST['enab']);
$pfs = return_variable($_POST['pfs']);
$date = return_variable($_POST['date']);
echo "</body>";
echo "</html>";
switch ($choix)
{
	case "pfs" :
			//affiche_liste_pfs($choix,$date);
			//if ($enab == 1)
		     		#liste_uvm_by_pfs_mere($_POST['pfs']);
		     		liste_uvm_by_pfs_mere($pfs, $date);
			break ;
	case "xen" :
			liste_uvm_by_xen();
			break;
	default : 
			//formulaire();
			break;
}
mysql_close();

?>
