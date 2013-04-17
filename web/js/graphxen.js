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
		                    		'Disk Dispo: '+ Math.round((this.y * 18)*100 ) / 100 + 'Go';
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
		                text: 'Umem et Udisk Utilisé par Bulle'
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
		                			this.series.name +' utilisés : '+ this.y +'<br/>' + 
		                   		 //return '<b>'+ this.x +'</b><br/>'+
		                    	//    this.series.name +': '+ this.y +'<br/>'+
		                    	//    'Total: '+ this.point.stackTotal;
		                    		'Mem Dispo: '+ this.y / 2 + 'Go';
		                   }
		                   if (this.series.name == 'uDisk')
		                	{
		                		return '<b>'+ this.x +'</b><br/>'+
		                			this.series.name +' utilisés : '+ this.y +'<br/>' + 
		                   		 //return '<b>'+ this.x +'</b><br/>'+
		                    	//    this.series.name +': '+ this.y +'<br/>'+
		                    	//    'Total: '+ this.point.stackTotal;
		                    		'Disk utilisés: '+ Math.round((this.y * 18)*100 ) / 100 + 'Go';
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
	    	
	    	
	    	$.getJSON('api?command=getViewAllByBulle', function(data) {
	    		$.each(data[0], function(i,val){
	    			console.log(i);
	    			console.log(val);
	    			
			        chart = new Highcharts.Chart({
			            chart: {
							renderTo: 'viewallby_' + i,
							zoomType: 'xy'
			            },
			            title: {
			                text: 'Vue globale par Bulle ('+i+')'
			            },
			            xAxis: {
			                categories: val[0],
			                labels: {
			                	rotation : -60,
			                	align : 'right',
			                	style: {
									color: '#6D869F',
									//fontWeight: 'bold'
								}
			                }			                
			            },
			            tooltip: {
			                formatter: function() {
				                var s = '<b>'+ this.x +'</b>';
				                
				                $.each(this.points, function(i, point) {
				                	if (point.series.name == "umem used") {
				                		var_umem_used = point.y;
				                	}
				                	if (point.series.name == "ucpu used") {
				                		var_ucpu_used = point.y;
				                	}
				                	if (point.series.name == "umem total") {
				                		var_umem_total = point.y;
				                	}
				                	if (point.series.name == "ucpu total") {
				                		var_ucpu_total = point.y;
				                	}
				                });
				                var_umem_dispo = var_umem_total - var_umem_used;
				                var_ucpu_dispo = var_ucpu_total - var_umem_used;
				                
				                s += '<br/> uMem total: '+ var_umem_total +'('+ (var_umem_total / 2) +'Go)'+
				                '<br/> uMem utilisées : '+ var_umem_used +'('+ (var_umem_used / 2) +'Go)'+
				                '<br/> <b>uMem dispo : '+ var_umem_dispo +'('+ (var_umem_dispo / 2) +'Go)</b>'+
				                '<br/> uCpu total: '+ var_ucpu_total +'('+ (var_ucpu_total / 2) +'Go)'+
				                '<br/> uCpu utilisées : '+ var_ucpu_used +'('+ (var_ucpu_used / 2) +'Go)'+
				                '<br/> <b>uCpu dispo : '+ var_ucpu_dispo +'('+ (var_ucpu_dispo / 2) +'Go)</b>';

				                return s;
			                   
			                    //var s;
			                    //if (this.point.name) { // the pie chart
			                    //   s = ''+
			                    //        this.point.name +': '+ this.y +' fruits';
			                    //} else {
			                    //    s = ''+
			                    //        this.x  +': '+ this.y;
			                    //}
			                    //return s;
			                },
			                shared: true
			            },
			            //labels: {
			            //    items: [{
			            //        html: ' ',
			            //        style: {
			            //            left: '40px',
			            //            top: '8px',
			            //            color: 'black'
			            //        }
			            //    }]
			            //},
			            series: [{
			                type: 'column',
			                name: 'umem used',
			                data: val[1], //val[3],
			                color: Highcharts.getOptions().colors[0]
			            }, {
			                type: 'column',
			                name: 'ucpu used',
			                data: val[2], //val[4],
			                color: Highcharts.getOptions().colors[1]
			            }, {
			                type: 'spline',
			                name: 'umem total',
			                data: val[3], //val[1],
			                color: Highcharts.getOptions().colors[0],
			                marker: {
			                	lineWidth: 1,
			                	lineColor: Highcharts.getOptions().colors[0],
			                	fillColor: 'white'
			                }
			            }, {
			                type: 'spline',
			                name: 'ucpu total',
			                data: val[4], //val[2],
			                color: Highcharts.getOptions().colors[1],
			                marker: {
			                	lineWidth: 1,
			                	lineColor: Highcharts.getOptions().colors[1],
			                	fillColor: Highcharts.getOptions().colors[1]
			                	//'white'
			                }
			            }
			            //, {
			            //    type: 'pie',
			            //    name: 'Total consumption',
			            //    data: [{
			            //        name: 'Jane',
			            //        y: 13,
			            //        color: Highcharts.getOptions().colors[0] // Jane's color
			            //    }, {
			            //        name: 'John',
			            //        y: 23,
			            //        color: Highcharts.getOptions().colors[1] // John's color
			            //    }, {
			            //        name: 'Joe',
			            //        y: 19,
			            //        color: Highcharts.getOptions().colors[2] // Joe's color
			            //    }],
			            //    center: [100, 80],
			            //    size: 100,
			            //    showInLegend: false,
			            //    dataLabels: {
			            //        enabled: false
			            //    }
			            //}
			            ]
			        });
				});
		    });
	    	
	    	
		
		
		
		
		
	});
});