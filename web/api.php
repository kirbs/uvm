<?php


include "config.inc";


function getListGlobal($lastDate)
{
	$json = array();
	
	$json[] = array("title" => "Nombre de PFS mére", "value" => nombre_element("pfs_mere", $lastDate));
	$json[] = array("title" => "Nombre de PFS fille", "value" => nombre_element("pfs_fille", $lastDate));
	$json[] = array("title" => "Nombre de serveurs Xen", "value" => nombre_element("srv_xen", $lastDate));
	$json[] = array("title" => "Nombre de VM", "value" => nombre_element("vm_name", $lastDate));
	$json[] = array("title" => "Nombre total d'uVM", "value" => nombre_total_uvm($lastDate));
	echo json_encode($json);
}


function getListPfsMere()
{
	$ReqListPfsMere = mysql_query("SELECT distinct(pfs_mere) FROM uVM");
	$json = array();
	while ($array  = mysql_fetch_array($ReqListPfsMere))
	{
		$json[] = $array['pfs_mere'];
	}
        echo json_encode($json);
}


function getListPfsMereUvm($lastDate)
{

    $ReqListPfsMere = mysql_query("SELECT distinct(pfs_mere) FROM uVM");
    $json = array();
    while ($array  = mysql_fetch_array($ReqListPfsMere))
    {
		$ReqListPfsFille = mysql_query("SELECT uvm_total FROM uVM WHERE pfs_mere = '$array[pfs_mere]' AND date_uvm = '$lastDate'");
		$total_uvm_by_pfsmere = 0;
        while ($array2  = mysql_fetch_array($ReqListPfsFille))
		{
			$total_uvm_by_pfsmere = $total_uvm_by_pfsmere + $array2[uvm_total];
		}

		if ( $total_uvm_by_pfsmere != 0)
        	$json[] = array($array['pfs_mere'],$total_uvm_by_pfsmere);
    }
        echo json_encode($json);
}

function getListPfsMereVM($lastDate)
{

    $ReqListPfsMere = mysql_query("SELECT distinct(pfs_mere) FROM uVM");
    $json = array();
    while ($array  = mysql_fetch_array($ReqListPfsMere))
    {
		$ReqListVMByPFS = mysql_query("SELECT vm_name FROM uVM WHERE pfs_mere = '$array[pfs_mere]' AND date_uvm = '$lastDate'");
		$nbVMByPFS = mysql_num_rows($ReqListVMByPFS);
        $json[] = array($array['pfs_mere'],$nbVMByPFS);
    }
        echo json_encode($json);
}

function getListDate()
{
    $ReqListPfsMere = mysql_query("SELECT distinct(date_uvm) FROM uVM");
    $json = array();
    while ($array  = mysql_fetch_array($ReqListPfsMere))
    {
        $json[] = $array['date_uvm'];
    }
        echo json_encode($json);
}

function timestamp($date)
{
  list($year, $month, $day) = explode('-', $date);
  $timestamp = mktime(0, 0, 0, $month, $day, $year);
  return $timestamp;
}

/*function getNbUvmByDate()
{
	$ReqListDate = mysql_query("SELECT distinct(date_uvm) FROM uVM");
	$json = array();
	while ($array = mysql_fetch_array($ReqListDate))
	{
		$ReqNbUvmByDate = mysql_query("SELECT vm_name FROM uVM WHERE date_uvm = '$array[date_uvm]'");
		$nb = mysql_num_rows($ReqNbUvmByDate);
		$json[] = array(timestamp($array['date_uvm']), $nb);
	}
	echo json_encode($json);
}*/

function getNbUvmByDate()
{
	$ReqListDate = mysql_query("SELECT distinct(date_uvm) FROM uVM");
	$json = array();
	$arrayA = array();
	while ($array = mysql_fetch_array($ReqListDate))
	{	
		$arrayA[] = $array['date_uvm'];
	}
	$arrayB = array();
	$arrayC = array();
	while ($array = mysql_fetch_array($ReqListDate))
	{
		$REQSITE = mysql_query("SELECT distinct(site) FROM uVM");
		while ($arrayf = mysql_fetch_array($REQSITE))
		{
			$ReqNbUvmByDate = mysql_query("SELECT vm_name FROM uVM WHERE date_uvm = '$array[date_uvm]' AND site = '$arrayf[site]'");
			$nb = mysql_num_rows($ReqNbUvmByDate);
			$arrayC[] = $nb;
		}
		$arrayB[] = array($arrayf['site'], $arrayC); 
		
	}
	$json[] = $array($arrayB,arrayC);
	echo json_encode($json);
}



function getListPfsMereUvmBySite($lastDate,$site)
{

    $ReqListPfsMere = mysql_query("SELECT distinct(pfs_mere) FROM uVM");
    $json = array();
    while ($array  = mysql_fetch_array($ReqListPfsMere))
    {
		$ReqListPfsFille = mysql_query("SELECT uvm_total FROM uVM WHERE pfs_mere = '$array[pfs_mere]' AND date_uvm = '$lastDate' AND site = '$site'");
		$total_uvm_by_pfsmere = 0;
        while ($array2  = mysql_fetch_array($ReqListPfsFille))
		{
			$total_uvm_by_pfsmere = $total_uvm_by_pfsmere + $array2[uvm_total];
		}
		if ( $total_uvm_by_pfsmere != 0)
        	$json[] = array($array['pfs_mere'],$total_uvm_by_pfsmere);
    }
        echo json_encode($json);
}

function getPopulation($lastDate)
{
	$json = Array();
	$arraya = Array();
	$ReqPopulation = mysql_query("SELECT uvm_memory, uvm_cpu FROM uVM WHERE date_uvm = '$lastDate' AND site = 'HT2' ");
	while ($array = mysql_fetch_array($ReqPopulation))
	{
		//$json[] = array(intval($array['uvm_cpu']),intval($array['uvm_memory']));
		$arraya[] = array(intval($array['uvm_cpu']),intval($array['uvm_memory']));
	}
	$json[] = array("HT2", $arraya);
	
	$arrayb = Array();
	$ReqPopulation = mysql_query("SELECT uvm_memory, uvm_cpu FROM uVM WHERE date_uvm = '$lastDate' AND site = 'Montsouris' ");
	while ($array = mysql_fetch_array($ReqPopulation))
	{
		//$json[] = array(intval($array['uvm_cpu']),intval($array['uvm_memory']));
		$arrayb[] = array(intval($array['uvm_cpu']),intval($array['uvm_memory']));
	}
	$json[] = array("Montsouris", $arrayb);
	
	$arrayb = Array();
	$ReqPopulation = mysql_query("SELECT uvm_memory, uvm_cpu FROM uVM WHERE date_uvm = '$lastDate' AND site = 'Immeuble Gambetta' ");
	while ($array = mysql_fetch_array($ReqPopulation))
	{
		//$json[] = array(intval($array['uvm_cpu']),intval($array['uvm_memory']));
		$arrayb[] = array(intval($array['uvm_cpu']),intval($array['uvm_memory']));
	}
	$json[] = array("Montsouris", $arrayb);
	
	echo json_encode($json);
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

$command = return_variable($_GET['command']);
$site = return_variable($_GET['site']);

switch ($command)
{
	case "getListPfsMere" :
				getListPfsMere();
				break;

	case "getListPfsMereUvm" :
				getListPfsMereUvm($lastDate);
				break;
				
	case "getListPfsMereUvmBySite" :
				getListPfsMereUvmBySite($lastDate,$site);
				break;
				
	case "getListPfsMereVM" :
				getListPfsMereVM($lastDate);
				break;
				
	case "getListGlobal":
				getListGlobal($lastDate);
				break;

	case "getPopulation":
				getPopulation($lastDate);
				break;
				
	case "getListDate":
				getListDate();
				break;
				
	case "getNbUvmByDate":
				getNbUvmByDate();
				break;
    default : 
                        break;
}

mysql_close();


?>
