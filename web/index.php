<?php

include("header.html");
include("config.inc");


$today = $lastDate;


function formulaire($today)
{
	echo "
	<div class='yui3-skin-sam' id='simple'></div>

	<button id='openButton'>Open Panel</button>
	
	<div id='panelContent' class='yui3-widget-loading'>
    	<div class='yui3-widget-hd'>
        	Showing an animated panel
    	</div>
    	<div class='yui3-widget-bd'>
			<div id='graphUvmByAllSite' class='yui3-widget-bd' ></div>
			<div id='graphVMByAllSite' style='min-width: 300px; height: 300px; margin: 0 auto'></div>
    	</div>
	</div>
	
	
<br><br>

	<form id='form' method='post' action='index.php'>
	<table width='100%'>
		<tr>
			<td width='30%' align='center'>
       			<div id='choice_date_click' ></div>
       		</td>
       		<td width='70%' align='left'>
		        <input type=hidden name='date' id='choice_date_click_field'>
				<table><tr><td>Vue des uvms par : 
					<!-- <select name=choix>
						<option value='vide'>---</option>
						<option value='pfs'>PFS</option>
						<option value='xen'>Serveur Xen</option>
					</select> -->
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

function liste_uvm_by_pfs_mere($pfs, $date)
{
	echo "<table width=50% border=\"1\">";
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
						<table border=1 width='100%'>
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
     			echo "<div><a href=\"\" onclick=\"toggleNode(this.parentNode); return false;\"><table border=1 width='100%'><tr><td>$PFSfille[pfs_fille]</td><td align=right>$cpt2</td></tr></table></a>";
			$resultatvm = mysql_query("SELECT * FROM uVM WHERE pfs_mere = '$PFSmere[pfs_mere]' AND pfs_fille = '$PFSfille[pfs_fille]' AND date_uvm = '$date' ORDER BY uvm_total DESC");
			while($result = mysql_fetch_array($resultatvm))
			{
				echo " <div>
				<table border=1 width='100%'>
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
