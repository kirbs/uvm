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
	$ReqListPfsMere = mysql_query("SELECT distinct(pfs_mere) FROM uVM ORDER BY pfs_mere ASC");
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

function getNbVmByDate()
{
	$arrayA = array();
	$arrayB = array();
	
	$ReqListDate = mysql_query("SELECT distinct(date_uvm) FROM uVM ORDER BY date_uvm ASC");
	while ($array = mysql_fetch_array($ReqListDate))
	{	
		$arrayA[] = $array['date_uvm'];
	}
	$REQSITE = mysql_query("SELECT distinct(site) FROM uVM");
	while ($arrayf = mysql_fetch_array($REQSITE))
	{
		$arrayC = array();
		$ReqListDate = mysql_query("SELECT distinct(date_uvm) FROM uVM ORDER BY date_uvm ASC");
		while ($array = mysql_fetch_array($ReqListDate))
		{	
			$ReqNbUvmByDate = mysql_query("SELECT vm_name FROM uVM WHERE date_uvm = '$array[date_uvm]' AND site = '$arrayf[site]'");
			$nb = mysql_num_rows($ReqNbUvmByDate);
			$arrayC[] = $nb;
		}
		$arrayB[$arrayf['site']] = $arrayC;
	}
		
	$json = array($arrayA,$arrayB);
	echo json_encode($json);
	
	//print_r($json[1]['HT2']);
}

function getNbUvmByDate()
{
	$arrayA = array();
	$arrayB = array();
	
	$ReqListDate = mysql_query("SELECT distinct(date_uvm) FROM uVM ORDER BY date_uvm ASC");
	while ($array = mysql_fetch_array($ReqListDate))
	{	
		$arrayA[] = $array['date_uvm'];
	}
	$REQSITE = mysql_query("SELECT distinct(site) FROM uVM");
	while ($arrayf = mysql_fetch_array($REQSITE))
	{
		$arrayC = array();
		$ReqListDate = mysql_query("SELECT distinct(date_uvm) FROM uVM ORDER BY date_uvm ASC");
		while ($array = mysql_fetch_array($ReqListDate))
		{
			$ReqUvmTotal = mysql_query("SELECT uvm_total FROM uVM WHERE date_uvm = '$array[date_uvm]' AND site = '$arrayf[site]'");
			$nb = 0;
        	while ($array2  = mysql_fetch_array($ReqUvmTotal))
			{
				$nb = $nb + $array2[uvm_total];
			}	
			//$ReqNbUvmByDate = mysql_query("SELECT vm_name FROM uVM WHERE date_uvm = '$array[date_uvm]' AND site = '$arrayf[site]'");
			//$nb = mysql_num_rows($ReqNbUvmByDate);
			$arrayC[] = $nb;
		}
		$arrayB[$arrayf['site']] = $arrayC;
	}
		
	$json = array($arrayA,$arrayB);
	echo json_encode($json);
	
	//print_r($json[1]['HT2']);
}

function getNbUvmBySite($lastDate)
{
	$arrayA = array();
	$arrayB = array();
	
	$REQSITE = mysql_query("SELECT distinct(site) FROM uVM");
	while ($arrayf = mysql_fetch_array($REQSITE))
	{
		if ($arrayf['site'] != "")
		{	
			$ReqUvmTotal = mysql_query("SELECT uvm_total FROM uVM WHERE date_uvm = '$lastDate' AND site = '$arrayf[site]'");
			$nb = 0;
        	while ($array2  = mysql_fetch_array($ReqUvmTotal))
			{
				$nb = $nb + $array2[uvm_total];
			}	
			$arrayB[] = $nb;
			$arrayA[] = $arrayf['site'];
			
			$ReqNbVm = mysql_query("SELECT vm_name FROM uVM WHERE date_uvm = '$lastDate' AND site = '$arrayf[site]'");
			$nb = mysql_num_rows($ReqNbVm);
			$arrayC[] = $nb;
		}
	}
		
	$json = array($arrayA,$arrayB, $arrayC);
	echo json_encode($json);
	
	//print_r($json[1]['HT2']);
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

function getListPfsMereUvmBySiteBack($lastDate)
{

	$json_site = array();
	
	$ReqListSite = mysql_query("SELECT distinct(site) FROM uVM");
    while ($array_site  = mysql_fetch_array($ReqListSite))
    {
    	if ($array_site['site'] != "")
		{
	    	$json2 = array();	
		    $ReqListPfsMere = mysql_query("SELECT distinct(pfs_mere) FROM uVM");
		    while ($array  = mysql_fetch_array($ReqListPfsMere))
		    {
				$ReqListPfsFille = mysql_query("SELECT uvm_total FROM uVM WHERE pfs_mere = '$array[pfs_mere]' AND date_uvm = '$lastDate' AND site = '$array_site[site]'");
				$total_uvm_by_pfsmere = 0;
		        while ($array2  = mysql_fetch_array($ReqListPfsFille))
				{
					$total_uvm_by_pfsmere = $total_uvm_by_pfsmere + $array2[uvm_total];
				}
				if ( $total_uvm_by_pfsmere != 0)
		        	$json2[] = array($array['pfs_mere'],$total_uvm_by_pfsmere);
			}
			$json_site[$array_site['site']] = $json2;
		}
		$t = "titre";
	}
	$json = array(array($lastDate),array($t), $json_site);
    echo json_encode($json);
}


function getPopulationUvmMemCpu($lastDate)
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


function getPopulationUvmMemDisk($lastDate)
{
	$json = Array();
	$arraya = Array();
	$ReqPopulation = mysql_query("SELECT uvm_memory, uvm_disk FROM uVM WHERE date_uvm = '$lastDate' AND site = 'HT2' ");
	while ($array = mysql_fetch_array($ReqPopulation))
	{
		//$json[] = array(intval($array['uvm_cpu']),intval($array['uvm_memory']));
		$arraya[] = array(intval($array['uvm_disk']),intval($array['uvm_memory']));
	}
	$json[] = array("HT2", $arraya);
	
	$arrayb = Array();
	$ReqPopulation = mysql_query("SELECT uvm_memory, uvm_disk FROM uVM WHERE date_uvm = '$lastDate' AND site = 'Montsouris' ");
	while ($array = mysql_fetch_array($ReqPopulation))
	{
		//$json[] = array(intval($array['uvm_cpu']),intval($array['uvm_memory']));
		$arrayb[] = array(intval($array['uvm_disk']),intval($array['uvm_memory']));
	}
	$json[] = array("Montsouris", $arrayb);
	
	$arrayb = Array();
	$ReqPopulation = mysql_query("SELECT uvm_memory, uvm_disk FROM uVM WHERE date_uvm = '$lastDate' AND site = 'Immeuble Gambetta' ");
	while ($array = mysql_fetch_array($ReqPopulation))
	{
		//$json[] = array(intval($array['uvm_cpu']),intval($array['uvm_memory']));
		$arrayb[] = array(intval($array['uvm_disk']),intval($array['uvm_memory']));
	}
	$json[] = array("Montsouris", $arrayb);
	
	echo json_encode($json);
}


function getListUvmByXen($site,$lastDate)
{
	$json = array();
	$req_liste_xen = mysql_query("SELECT distinct(srv_xen) FROM uVM WHERE site='$site' AND date_uvm = '$lastDate' order by srv_xen ASC");
    while($srv = mysql_fetch_array($req_liste_xen))
	{
		$req_liste_vm_in_xen = mysql_query("SELECT uvm_total FROM uVM WHERE srv_xen  = '$srv[srv_xen]' AND date_uvm = '$lastDate'");
		$cpt = 0;
        	while($uvm_vm = mysql_fetch_array($req_liste_vm_in_xen))
		{
			$cpt = $cpt + $uvm_vm["uvm_total"];
		}
		$json[] = array($srv[srv_xen], $cpt);
	}
	echo json_encode($json);
}


function getCapacityuMemuCpuByBulle($lastDate)
{
	$Bulle =array();
	$reqListBulle = mysql_query("SELECT distinct(bulle) FROM SrvXen order by bulle ASC");
	while($ArrayBulle = mysql_fetch_array($reqListBulle))
	{
		//echo "--- bulle : $ArrayBulle[bulle]<br>";
		
		
		$SrvArray = array();
		$reqListSrvByBulle = mysql_query("SELECT srvxen_name FROM SrvXen WHERE bulle = '$ArrayBulle[bulle]' order by srvxen_name ASC");
		while($ArraySrv = mysql_fetch_array($reqListSrvByBulle))
		{
			$SrvArray[] = $ArraySrv['srvxen_name'];
			//echo "-- srv : $ArraySrv[srvxen_name]<br>";
		}
		
		$UmemArray = array();
		$reqListUmemFreeBySrvByBulle = mysql_query("SELECT srvxen_name, uvm_memory_free FROM SrvXen WHERE bulle = '$ArrayBulle[bulle]' order by srvxen_name ASC");
		while($ArrayUmemFree = mysql_fetch_array($reqListUmemFreeBySrvByBulle))
		{
			$UmemArray[] = $ArrayUmemFree['uvm_memory_free'];
			//echo "-- Umem : $ArrayUmemFree[uvm_memory_free]<br>";
		}
		
		$UdiskArray = array();
		$reqListUdiskFreeBySrvByBulle = mysql_query("SELECT srvxen_name, uvm_disk_free FROM SrvXen WHERE bulle = '$ArrayBulle[bulle]' order by srvxen_name ASC");
		while($ArrayUdiskFree = mysql_fetch_array($reqListUdiskFreeBySrvByBulle))
		{
			$UdiskArray[] = $ArrayUdiskFree['uvm_disk_free'];
			//echo "-- Udisk : $ArrayUdiskFree[uvm_disk_free]<br>";
		}
		
		$Bulle[$ArrayBulle['bulle']] = array($SrvArray,$UmemArray,$UdiskArray);	
	}
	$json = array($Bulle);
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
				
	case "getListPfsMereUvmBySiteBack" :
				getListPfsMereUvmBySiteBack($lastDate);
				break;
				
	case "getListPfsMereVM" :
				getListPfsMereVM($lastDate);
				break;
				
	case "getListGlobal":
				getListGlobal($lastDate);
				break;

	case "getPopulationUvmMemCpu":
				getPopulationUvmMemCpu($lastDate);
				break;
				
	case "getPopulationUvmMemDisk":
				getPopulationUvmMemDisk($lastDate);
				break;
				
	case "getListDate":
				getListDate();
				break;
				
	case "getNbVmByDate":
				getNbVmByDate();
				break;
				
	case "getNbUvmByDate":
				getNbUvmByDate();
				break;

	case "getNbUvmBySite":
				getNbUvmBySite($lastDate);
				break;	
				
	case "getListUvmByXen":
				getListUvmByXen($site,$lastDate);
				break;	

	case "getCapacityuMemuCpuByBulle":
				getCapacityuMemuCpuByBulle($lastDate);
				break;
    default : 
                        break;
}

mysql_close();


?>
