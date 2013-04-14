$(function() {
    var chart;

    $(document).ready(function() {


	    $.getJSON('api?command=getViewByBulle', function(data) {
	    		
	    	$.each(data[0], function(i,val){
	    		console.log(i);
	    		console.log(val);
	    		    	
	    	//console.log(data);
		        chart = new Highcharts.Chart({
		            chart: {
		                renderTo: 'Capacity_'+ i,
		                type: 'column',
		                zoomType: 'xy'
		            },
		            title: {
		                text: 'Umem et Udisk Disponible par Serveur (Bulle '+ i +' )'
		            },
		            xAxis: {
		                categories: val[0],
		                //["xen0stratus001.cloud.s1.p.fti.net","xen0stratus002.cloud.s1.p.fti.net","xen0stratus003.cloud.s1.p.fti.net","xen0stratus004.cloud.s1.p.fti.net","xen0stratus005.cloud.s1.p.fti.net","xen0stratus006.cloud.s1.p.fti.net","xen0stratus007.cloud.s1.p.fti.net","xen0stratus008.cloud.s1.p.fti.net","xen0stratus009.cloud.s1.p.fti.net","xen0stratus010.cloud.s1.p.fti.net","xen0stratus201.cloud.b1.p.fti.net","xen0stratus202.cloud.b1.p.fti.net","xen0stratus203.cloud.b1.p.fti.net","xen0stratus204.cloud.b1.p.fti.net","xen0stratus205.cloud.b1.p.fti.net","xen0stratus206.cloud.b1.p.fti.net","xen0stratus207.cloud.b1.p.fti.net","xen0stratus208.cloud.b1.p.fti.net","xen0stratus209.cloud.b1.p.fti.net","xen0stratus210.cloud.b1.p.fti.net"],
		                labels: {
		                	rotation : -60,
		                	align : 'right',
		                	style: {
								color: '#6D869F',
								//fontWeight: 'bold'
							}
		                }
		            },
		            yAxis: {
		                min: 0,
		                title: {
		                    text: 'Unités'
		                },
		                stackLabels: {
		                    enabled: false,
		                    style: {
		                        fontWeight: 'bold',
		                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
		                    }
		                }
		            },
		            legend: {
		                align: 'right',
		                x: -100,
		                verticalAlign: 'top',
		                y: 20,
		                floating: true,
		                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
		                borderColor: '#CCC',
		                borderWidth: 1,
		                shadow: false
		            },
		            tooltip: {
		                formatter: function() {
		                	if (this.series.name == 'uMem')
		                	{
		                		return '<b>'+ this.x +'</b><br/>'+
		                			this.series.name +' dispo : '+ this.y +'<br/>' + 
		                   		 //return '<b>'+ this.x +'</b><br/>'+
		                    	//    this.series.name +': '+ this.y +'<br/>'+
		                    	//    'Total: '+ this.point.stackTotal;
		                    		'Mem Dispo: '+ this.y / 2 + 'Go';
		                   }
		                   if (this.series.name == 'uDisk')
		                	{
		                		return '<b>'+ this.x +'</b><br/>'+
		                			this.series.name +' dispo : '+ this.y +'<br/>' + 
		                   		 //return '<b>'+ this.x +'</b><br/>'+
		                    	//    this.series.name +': '+ this.y +'<br/>'+
		                    	//    'Total: '+ this.point.stackTotal;
		                    		'Disk Dispo: '+ Math.round((this.y / 18)*100 ) / 100 + 'Go';
		                   }
		                }
		            },
		            plotOptions: {
		                column: {
		                    stacking: 'normal',
		                    dataLabels: {
		                        enabled: true,
		                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
		                    }
		                }
		            },
		            series: [{
		                name: 'uMem',
		                data: val[1]
		                //[58,58,58,58,58,58,58,104,58,104,58,58,58,58,58,58,58,104,58,108]
		            }, {
		                name: 'uDisk',
		                data: val[2]
		                //[64,65,65,65,74,65,65,70,65,70,65,65,65,65,65,65,65,67,65,68]
		            }]
		        });
	    	});
	    });
		
		
	    $.getJSON('api?command=getViewConsommationByBulle', function(data) {
	    		
	    	//$.each(data[0], function(i,val){
	    	//	console.log(i);
	    	//	console.log(val);
	    		    	
	    	//console.log(data);
		        chart = new Highcharts.Chart({
		            chart: {
		                renderTo: 'ConsommationByBulle',
		                type: 'column',
		                zoomType: 'xy'
		            },
		            title: {
		                text: 'Umem et Udisk Utilisé par Bulle)'
		            },
		            xAxis: {
		                categories: data[0],
		                //["xen0stratus001.cloud.s1.p.fti.net","xen0stratus002.cloud.s1.p.fti.net","xen0stratus003.cloud.s1.p.fti.net","xen0stratus004.cloud.s1.p.fti.net","xen0stratus005.cloud.s1.p.fti.net","xen0stratus006.cloud.s1.p.fti.net","xen0stratus007.cloud.s1.p.fti.net","xen0stratus008.cloud.s1.p.fti.net","xen0stratus009.cloud.s1.p.fti.net","xen0stratus010.cloud.s1.p.fti.net","xen0stratus201.cloud.b1.p.fti.net","xen0stratus202.cloud.b1.p.fti.net","xen0stratus203.cloud.b1.p.fti.net","xen0stratus204.cloud.b1.p.fti.net","xen0stratus205.cloud.b1.p.fti.net","xen0stratus206.cloud.b1.p.fti.net","xen0stratus207.cloud.b1.p.fti.net","xen0stratus208.cloud.b1.p.fti.net","xen0stratus209.cloud.b1.p.fti.net","xen0stratus210.cloud.b1.p.fti.net"],
		                labels: {
		                	rotation : -60,
		                	align : 'right',
		                	style: {
								color: '#6D869F',
								//fontWeight: 'bold'
							}
		                }
		            },
		            yAxis: {
		                min: 0,
		                title: {
		                    text: 'Unités'
		                },
		                stackLabels: {
		                    enabled: false,
		                    style: {
		                        fontWeight: 'bold',
		                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
		                    }
		                }
		            },
		            legend: {
		                align: 'right',
		                x: -100,
		                verticalAlign: 'top',
		                y: 20,
		                floating: true,
		                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
		                borderColor: '#CCC',
		                borderWidth: 1,
		                shadow: false
		            },
		            tooltip: {
		                formatter: function() {
		                	if (this.series.name == 'uMem')
		                	{
		                		return '<b>'+ this.x +'</b><br/>'+
		                			this.series.name +' dispo : '+ this.y +'<br/>' + 
		                   		 //return '<b>'+ this.x +'</b><br/>'+
		                    	//    this.series.name +': '+ this.y +'<br/>'+
		                    	//    'Total: '+ this.point.stackTotal;
		                    		'Mem Dispo: '+ this.y / 2 + 'Go';
		                   }
		                   if (this.series.name == 'uDisk')
		                	{
		                		return '<b>'+ this.x +'</b><br/>'+
		                			this.series.name +' dispo : '+ this.y +'<br/>' + 
		                   		 //return '<b>'+ this.x +'</b><br/>'+
		                    	//    this.series.name +': '+ this.y +'<br/>'+
		                    	//    'Total: '+ this.point.stackTotal;
		                    		'Disk Dispo: '+ Math.round((this.y / 18)*100 ) / 100 + 'Go';
		                   }
		                }
		            },
		            plotOptions: {
		                column: {
		                    stacking: 'normal',
		                    dataLabels: {
		                        enabled: true,
		                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
		                    }
		                }
		            },
		            series: [{
		                name: 'uMem',
		                data: data[1]
		                //[58,58,58,58,58,58,58,104,58,104,58,58,58,58,58,58,58,104,58,108]
		            }, {
		                name: 'uDisk',
		                data: data[2]
		                //[64,65,65,65,74,65,65,70,65,70,65,65,65,65,65,65,65,67,65,68]
		            }]
		        });
	    	});	
		
		
		
		
		
	});
});