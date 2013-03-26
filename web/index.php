<?php

include("header.html");
include("config.inc");


$today = $lastDate;


function formulaire($today)
{
	echo "<div class='yui3-skin-sam' id='simple'></div><table width='100%' ><tr><td width='30%'><table>
		<tr><td>Nombre de PFS mere : </td><td>". nombre_element("pfs_mere", $today) ." </td></tr>
		<tr><td>Nombre de PFS fille : </td><td>". nombre_element("pfs_fille", $today) ." </td></tr>
		<tr><td>Nombre de Serveur Xen : </td><td>". nombre_element("srv_xen", $today) ." </td></tr>
		<tr><td>Nombre de VM : </td><td>". nombre_element("vm_name", $today) ." </td></tr>
		<tr><td>Nombre total de uVM : </td><td>". nombre_total_uvm($today) ." </td></tr>
		</table></td><td><
		<div id='graphUvmByAllSite' style='min-width: 400px; height: 400px; margin: 0 auto'></div>
		<div id='graphUvmBSiteBagnolet' style='min-width: 400px; height: 400px; margin: 0 auto'></div>
		<div id='graphUvmBySiteSophia' style='min-width: 400px; height: 400px; margin: 0 auto'></div>
		<div id='graphUvmBySiteMontsuris' style='min-width: 400px; height: 400px; margin: 0 auto'></div>
		</td></tr></table>
<br><br>";

	echo "<form method='post' action='index.php'>
        <div id='choice_date_click' ></div>
<div id='template' class='yui3-skin-sam dt-example yui3-g'> <!-- You need this skin class -->
    <div class='yui3-u-1-3' id='mtable'></div>

    <!-- This is the HTML section for the 'Details' markup ...
         NOTE: it is hidden initially !!   -->
    <div class='yui3-u-2-3' id='chars' style='display:none;'>
        <div id='dtable'></div>
    </div>
</div>
        <input type=hidden name='date' id='choice_date_click_field'>
		<table><tr><td>Vue des uvms par : 
		<select name=choix>
			<option value='vide'>---</option>
			<option value='pfs'>PFS</option>
			<option value='xen'>Serveur Xen</option>
		</select>
		<input type=hidden name='enab' value=0>
		<input type='submit' value='Valider'>
		</td></tr></table></form>";
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
    echo "date : $date";
	echo "<table width=50% border=\"0\">";
	if ($pfs == "all")
		$CONDITION = "WHERE 1 AND date_uvm = '$date'";
	else
		$CONDITION = "WHERE pfs_mere = '$pfs' AND date_uvm = '$date'";

	$req_liste_pfs_mere = mysql_query("SELECT distinct(pfs_mere) FROM uVM $CONDITION");
	while($PFSmere = mysql_fetch_array($req_liste_pfs_mere))
	{
		$req_UvmByPFSmere = mysql_query("SELECT uvm_total FROM uVM WHERE pfs_mere = '$PFSmere[pfs_mere]' AND date_uvm = '$date'");
		$cpt = 0;
		while ($UvmByPFSmere = mysql_fetch_array($req_UvmByPFSmere))
		{
			$cpt = $cpt + $UvmByPFSmere["uvm_total"];
		}
		echo "<tr><td><div class=\"root\"><a href=\"\" onclick=\"toggleNode(this.parentNode); return false;\"><table border=0 width='100%'><tr><td>$PFSmere[pfs_mere]</td><td align=right>$cpt uvm total</td></tr></table></a>";
		$req_liste_pfs_fille = mysql_query("SELECT distinct(pfs_fille) FROM uVM WHERE pfs_mere = '$PFSmere[pfs_mere]' AND date_uvm = '$date'");
		while($PFSfille = mysql_fetch_array($req_liste_pfs_fille))
		{
			$req_UvmByPFSfille = mysql_query("SELECT uvm_total FROM uVM WHERE pfs_fille = '$PFSfille[pfs_fille]' AND date_uvm = '$date'");
			$cpt2 = 0;
			while ($UvmByPFSfille = mysql_fetch_array($req_UvmByPFSfille))
			{
				$cpt2 = $cpt2 + $UvmByPFSfille["uvm_total"];
			}
     			echo "<div><a href=\"\" onclick=\"toggleNode(this.parentNode); return false;\"><table border=0 width='100%'><tr><td>$PFSfille[pfs_fille]</td><td align=right>$cpt2</td></tr></table></a>";
			$resultatvm = mysql_query("SELECT * FROM uVM WHERE pfs_mere = '$PFSmere[pfs_mere]' AND pfs_fille = '$PFSfille[pfs_fille]' AND date_uvm = '$date'");
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


switch ($choix)
{
	case "pfs" :
			affiche_liste_pfs($choix,$date);
			if ($enab == 1)
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
