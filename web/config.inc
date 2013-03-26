<?php

$SRV_MYSQL = "localhost";
$USER_MYSQL = "uvm";
$PASSWORD_MYSQL = "x_MZNl6YTq";
$BASE_MYSQL = "uvm";



$db = mysql_pconnect($SRV_MYSQL,$USER_MYSQL,$PASSWORD_MYSQL); //'localhost', 'root', 'rootroot');
mysql_select_db($BASE_MYSQL,$db); //'uvm',$db);


$reqLastDate = mysql_query("SELECT distinct(date_uvm) FROM uVM ORDER BY date_uvm DESC LIMIT 1");
$resLastDate = mysql_fetch_array($reqLastDate);
$lastDate = $resLastDate['date_uvm'];


?>
