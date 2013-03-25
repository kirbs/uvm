<?php


include "config.inc";


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

        $json[] = array($array['pfs_mere'],$total_uvm_by_pfsmere);
    }
        echo json_encode($json);
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

switch ($command)
{
	case "getListPfsMere" :
				getListPfsMere();
				break;

	case "getListPfsMereUvm" :
				getListPfsMereUvm($lastDate);
				break;

    default : 
                        break;
}

mysql_close();


?>
