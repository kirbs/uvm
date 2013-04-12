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
		
		
		
		
		
		

		//<!-- GRAPH de Poupulation d' uVM MEM / CPU ALL SITE and Site Bagnolet, SOPHIA et MontSouris -->
		
	    $.getJSON('api.php?command=getPopulationUvmMemCpu', function(data) {	
		    chart = new Highcharts.Chart({
            	chart: {
                renderTo: 'populationUvmMemCpu',
                type: 'scatter',
                zoomType: 'xy'
            	},
            	title: {
                	text: 'Population des uVM'
            	},
            	subtitle: {
                	text: 'Source: uVM'
            	},
            	xAxis: {
                	title: {
                    	enabled: true,
                    	text: 'uCPU'
                	},
                	startOnTick: true,
                	endOnTick: true,
                	showLastLabel: true
            	},
            	yAxis: {
                	title: {
                    	text: 'uMEM'
                	}
            	},
            	tooltip: {
                	formatter: function() {
                    	    return ''+
                        	this.x +' uCPU, '+ this.y +' uMEM';
                	}
            	},            	
            	legend: {
                	layout: 'vertical',
                	align: 'left',
                	verticalAlign: 'top',
                	x: 60,
                	y: 10,
                	floating: true,
                	backgroundColor: '#FFFFFF',
                	borderWidth: 1
            	},
            	plotOptions: {
                	scatter: {
                    	marker: {
                        	radius: 5,
                        	states: {
                            	hover: {
                                	enabled: true,
                                	lineColor: 'rgb(100,100,100)'
                            	}
                        	}
                    	},
                    	states: {
                        	hover: {
                            	marker: {
                                enabled: false
                            	}
                        	}
                    	}
                	}
            	},
            	series: [{
                	name: 'Sophia',
                	color: 'rgba(255, 0, 0, .5)',
                	data: data[0][1]
            	},{
                	name: 'Montsouris',
                	color: 'rgba(0, 255, 0, .5)',
                	data: data[1][1]
            	},{
                	name: 'Bagnolet',
                	color: 'rgba(0, 0, 255, .5)',
                	data: data[2][1]
            	}]
        	});
    	});
    	//<!-- Fin GRAPH de Poupulation d' uVM MEM / CPU ALL SITE and Site Bagnolet, SOPHIA et MontSouris -->		
		

		//<!-- GRAPH de Poupulation d' uVM MEM / DISK ALL SITE and Site Bagnolet, SOPHIA et MontSouris -->
		
	    $.getJSON('api.php?command=getPopulationUvmMemDisk', function(data) {	
		    chart = new Highcharts.Chart({
            	chart: {
                renderTo: 'populationUvmMemDisk',
                type: 'scatter',
                zoomType: 'xy'
            	},
            	title: {
                	text: 'Population des uVM'
            	},
            	subtitle: {
                	text: 'Source: uVM'
            	},
            	xAxis: {
                	title: {
                    	enabled: true,
                    	text: 'uDisk'
                	},
                	startOnTick: true,
                	endOnTick: true,
                	showLastLabel: true
            	},
            	yAxis: {
                	title: {
                    	text: 'uMEM'
                	}
            	},
            	tooltip: {
                	formatter: function() {
                    	    return ''+
                        	this.x +' uDisk, '+ this.y +' uMEM';
                	}
            	},            	
            	legend: {
                	layout: 'vertical',
                	align: 'left',
                	verticalAlign: 'top',
                	x: 60,
                	y: 10,
                	floating: true,
                	backgroundColor: '#FFFFFF',
                	borderWidth: 1
            	},
            	plotOptions: {
                	scatter: {
                    	marker: {
                        	radius: 5,
                        	states: {
                            	hover: {
                                	enabled: true,
                                	lineColor: 'rgb(100,100,100)'
                            	}
                        	}
                    	},
                    	states: {
                        	hover: {
                            	marker: {
                                enabled: false
                            	}
                        	}
                    	}
                	}
            	},
            	series: [{
                	name: 'Sophia',
                	color: 'rgba(255, 0, 0, .5)',
                	data: data[0][1]
            	},{
                	name: 'Montsouris',
                	color: 'rgba(0, 255, 0, .5)',
                	data: data[1][1]
            	},{
                	name: 'Bagnolet',
                	color: 'rgba(0, 0, 255, .5)',
                	data: data[2][1]
            	}]
        	});
    	});
    	//<!-- Fin GRAPH de Poupulation d' uVM MEM / DISK ALL SITE and Site Bagnolet, SOPHIA et MontSouris -->	
		
		
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
		
		
		
		
		

		//<!-- GRAPH uVM Par serveur Xen Sophia -->
	
	    $.getJSON('api?command=getListUvmByXen&site=HT2', function(data) {
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: 'graphUvmXenByHT2',
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false
	            },
	            title: {
	                text: 'Pourcentage d\'uVM par Serveurs Xen (Sophia)'
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
		// <!-- Fin GRAPH uVM Par serveur Xen Sophia -->		
		
		
		
		//<!-- GRAPH uVM Par serveur Xen Bagnolet -->
	
	    $.getJSON('api?command=getListUvmByXen&site=Immeuble Gambetta', function(data) {
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: 'graphUvmXenByBagnolet',
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false
	            },
	            title: {
	                text: 'Pourcentage d\'uVM par Serveurs Xen (Bagnolet)'
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
		// <!-- Fin GRAPH uVM Par serveur Xen Bagnolet -->	
		
		
		
		//<!-- GRAPH uVM Par serveur Xen Montsouris -->
	
	    $.getJSON('api?command=getListUvmByXen&site=Montsouris', function(data) {
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: 'graphUvmXenByMontsouris',
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false
	            },
	            title: {
	                text: 'Pourcentage d\'uVM par Serveurs Xen (Montsouris)'
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
		// <!-- Fin GRAPH uVM Par serveur Xen Montsouris -->
		

	    $.getJSON('api?command=getCapacityuMemuCpuByBulle', function(data) {		
	        chart = new Highcharts.Chart({
	            chart: {
	                renderTo: 'Capacity',
	                type: 'column'
	            },
	            title: {
	                text: 'Stacked column chart'
	            },
	            xAxis: {
	                categories: data['Alpha'][0]
	                //['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
	            },
	            yAxis: {
	                min: 0,
	                title: {
	                    text: 'Total fruit consumption'
	                },
	                stackLabels: {
	                    enabled: true,
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
	                    return '<b>'+ this.x +'</b><br/>'+
	                        this.series.name +': '+ this.y +'<br/>'+
	                        'Total: '+ this.point.stackTotal;
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
	                data: data['Alpha'][1]
	                //[5, 3, 4, 7, 2]
	            }, {
	                name: 'uDisk',
	                data: data['Alpha'][2]
	                //[2, 2, 3, 2, 1]
	            }]
	        });
	    	//});
	    });
		
		
		
		
		
		
		
		
	});
});