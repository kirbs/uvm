$(function() {
    var chart;

    $(document).ready(function() {

		//<!-- GRAPH uVM ALL SITE -->
	
	    $.getJSON('api.php?command=getListPfsMereUvm', function(data) {
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: 'graphUvmByAllSite',
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false
	            },
	            title: {
	                text: 'Pourcentage d\'uVM par PFS tout sites'
	            },
	            tooltip: {
	                    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
	                percentageDecimals: 2
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: true,
	                        color: '#000000',
	                        connectorColor: '#000000',
    	                    formatter: function() {
	                            return '<b>'+ this.point.name +'</b>: '+ this.point.y +' uVM';
	                        }
	                    }
	                }
	            },
	            series: [{
	                type: 'pie',
	                name: 'uVM',
	                data : data
	            }]
			});
		});
		// <!-- Fin GRAPH uVM ALL SITE -->
		

		//<!-- GRAPH VM ALL SITE -->
	
	    $.getJSON('api.php?command=getListPfsMereVM', function(data) {
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: 'graphVMByAllSite',
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false
	            },
	            title: {
	                text: 'Pourcentage de VM par PFS tout sites'
	            },
	            tooltip: {
	                    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
	                percentageDecimals: 2
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: true,
	                        color: '#000000',
	                        connectorColor: '#000000',
    	                    formatter: function() {
	                            return '<b>'+ this.point.name +'</b>: '+ this.point.y +' VM';
	                        }
	                    }
	                }
	            },
	            series: [{
	                type: 'pie',
	                name: 'VM',
	                data: data
	            }]
			});
		});
		// <!-- Fin GRAPH VM ALL SITE -->
		
		
		
		
		
		//<!-- GRAPH uVM ALL SITE By Site Bagnolet -->

	    $.getJSON("api.php?command=getListPfsMereUvmBySite&site=Immeuble Gambetta", function(data) {
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: 'graphUvmBySiteBagnolet',
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false
	            },
	            title: {
	                text: 'Pourcentage d\'uVM par PFS (Bagnolet)'
	            },
	            tooltip: {
	                    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
	                percentageDecimals: 2
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: true,
	                        color: '#000000',
	                        connectorColor: '#000000',
    	                    formatter: function() {
	                            return '<b>'+ this.point.name +'</b>: '+ this.point.y +' uVM';
	                        }
	                    }
	                }
	            },
	            series: [{
	                type: 'pie',
	                name: 'uVM',
	                data: data
	            }]
			});
		});
		// <!-- Fin GRAPH uVM ALL SITE By Site Bagnolet -->
		
		
		

		
		
		//$.getJSON('api.php?command=getNbUvmByDate', function(data) {
		// // Create the chart
		//	console.log(data);
		//	$('#uvmbydate').highcharts('StockChart', {
		//	
		//
		//		rangeSelector : {
		//			selected : 1
		//		},
		//
		//		title : {
		//			text : 'Evolution des Uvm par Date'
		//		},
		//	
		//		series : [{
		//			name : 'uvm',
		//			data : data
		//		}]
		//	});
		//});
		
		$.getJSON('api.php?command=getNbVmByDate', function(data) {
			chart = new Highcharts.Chart({
	            chart: {
		            renderTo: 'vmbydate',	
		            type: 'area',
		        },
	            title: {
	                text: 'Evolution des VM dans le temps'
	            },
	            subtitle: {
	                text: 'Source: uVM'
	            },
	            xAxis: {
	                //categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
	                categories: data[0],
	                tickmarkPlacement: 'on',
	                title: {
	                    enabled: false
	                }
	            },
	            yAxis: {
	                title: {
	                    text: 'Nb VM'
	                },
	                //labels: {
	                //    formatter: function() {
	                //        return this.value / 1000;
	                //    }
	                //}
	            },
	            tooltip: {
	                shared: true,
	                valueSuffix: ' VMs'
	            },
	            plotOptions: {
	                area: {
	                    stacking: 'normal',
	                    lineColor: '#666666',
	                    lineWidth: 1,
	                    marker: {
	                        lineWidth: 1,
	                        lineColor: '#666666'
	                    }
	                }
	            },
	            series: [{
	                name: 'Sophia',
	                //data: [502, 635, 809, 947, 1402, 3634, 5268]
	                data: data[1]['HT2']
	            }, {
	                name: 'Montsouris',
	                data: data[1]['Montsouris']
	            }, {
	                name: 'Bagnolet',
	                data: data[1]['Immeuble Gambetta']
	            }, {
	                name: 'Non assigné',
	                data: data[1]['none']
	            }]
        	});		
		});
		
		
		$.getJSON('api.php?command=getNbUvmByDate', function(data) {
			chart = new Highcharts.Chart({
	            chart: {
		            renderTo: 'uvmbydate',	
		            type: 'area',
		        },
	            title: {
	                text: 'Evolution des uVM dans le temps'
	            },
	            subtitle: {
	                text: 'Source: uVM'
	            },
	            xAxis: {
	                //categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
	                categories: data[0],
	                tickmarkPlacement: 'on',
	                title: {
	                    enabled: false
	                }
	            },
	            yAxis: {
	                title: {
	                    text: 'Nb uVM'
	                },
	                //labels: {
	                //    formatter: function() {
	                //        return this.value / 1000;
	                //    }
	                //}
	            },
	            tooltip: {
	                shared: true,
	                valueSuffix: ' uVMs'
	            },
	            plotOptions: {
	                area: {
	                    stacking: 'normal',
	                    lineColor: '#666666',
	                    lineWidth: 1,
	                    marker: {
	                        lineWidth: 1,
	                        lineColor: '#666666'
	                    }
	                }
	            },
	            series: [{
	                name: 'Sophia',
	                //data: [502, 635, 809, 947, 1402, 3634, 5268]
	                data: data[1]['HT2']
	            }, {
	                name: 'Montsouris',
	                data: data[1]['Montsouris']
	            }, {
	                name: 'Bagnolet',
	                data: data[1]['Immeuble Gambetta']
	            }, {
	                name: 'Non assigné',
	                data: data[1]['none']
	            }]
        	});		
		});
		
		
		$.getJSON('api.php?command=getNbUvmBySite', function(data) {
			chart = new Highcharts.Chart({
	            chart: {
		            renderTo: 'uvmbysite',
		            polar: true,	
		            type: 'line'
		        },
			    title: {
			        text: 'Uvm Par Sites',
			        x: -80
			    },
			    
			    pane: {
			    	size: '80%'
			    },
			    
			    xAxis: {
			        categories: data[0],
			        tickmarkPlacement: 'on',
			        lineWidth: 0
			    },
			        
			    yAxis: {
			        gridLineInterpolation: 'polygon',
			        lineWidth: 0,
			        min: 0
			    },
			    
			    tooltip: {
			    	shared: true,
			        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>'
			    },
			    
			    legend: {
			        align: 'right',
			        verticalAlign: 'top',
			        y: 100,
			        layout: 'vertical'
			    },
			    
			    series: [{
			        name: 'uVM',
			        data: data[1],
			        pointPlacement: 'on'
			    },{
			        name: 'VM',
			        data: data[2],
			        pointPlacement: 'on'
			    }]
        	});		
		});		
		
		






	    $.getJSON('api.php?command=getListPfsMereUvmBySiteBack', function(data) {
	    	$.each(data[2], function(i,val){
	    		console.log(i);
	    		console.log(val);
				
				 chart = new Highcharts.Chart({
		            chart: {
		                renderTo: 'graphUvmBySite'+ i,
		                plotBackgroundColor: null,
		                plotBorderWidth: null,
		                plotShadow: false
		            },
		            title: {
		                text: data[1] + ' Pourcentage d\'uVM par PFS ' + i + '(' + data[0] + ')'
		            },
		            tooltip: {
		                    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
		                percentageDecimals: 2
		            },
		            plotOptions: {
		                pie: {
		                    allowPointSelect: true,
		                    cursor: 'pointer',
		                    dataLabels: {
		                        enabled: true,
		                        color: '#000000',
		                        connectorColor: '#000000',
	    	                    formatter: function() {
		                            return '<b>'+ this.point.name +'</b>: '+ this.point.y +' uVM';
		                        }
		                    }
		                }
		            },
		            series: [{
		                type: 'pie',
		                name: 'uVM',
		                data: val
		            }]
				});
			});
		});
		// <!-- Fin GRAPH uVM ALL SITE By Site Montsouris -->	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	});
});