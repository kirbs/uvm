$(function() {
    var chart;

    $(document).ready(function() {

		//<!-- GRAPH uVM ALL SITE -->
	
	    var output = new Array();
	    $.getJSON('api.php?command=getListPfsMereUvm', function(data) {
	        output = data;
			
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
	                name: 'Browser share',
	                data: output
	            }]
			});
		});
		// <!-- Fin GRAPH uVM ALL SITE -->
		

		//<!-- GRAPH VM ALL SITE -->
	
	    var datalistvm = new Array();
	    $.getJSON('api.php?command=getListPfsMereVM', function(data) {
	        datalistvm = data;
			
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
	                data: datalistvm
	            }]
			});
		});
		// <!-- Fin GRAPH VM ALL SITE -->
		
		
		
		
		
		//<!-- GRAPH uVM ALL SITE By Site Bagnolet -->
	
	    var outputb = new Array();
	    $.getJSON("api.php?command=getListPfsMereUvmBySite&site=Immeuble Gambetta", function(data) {
	        outputb = data;
			
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
	                name: 'Browser share',
	                data: outputb
	            }]
			});
		});
		// <!-- Fin GRAPH uVM ALL SITE By Site Bagnolet -->
		
		
		
		//<!-- GRAPH uVM ALL SITE By Site SOPHIA -->
	
	    var outputs = new Array();
	    $.getJSON('api.php?command=getListPfsMereUvmBySite&site=HT2', function(data) {
	        outputs = data;
			
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: 'graphUvmBySiteSophia',
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false
	            },
	            title: {
	                text: 'Pourcentage d\'uVM par PFS (Sophia)'
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
	                name: 'Browser share',
	                data: outputs
	            }]
			});
		});
		// <!-- Fin GRAPH uVM ALL SITE By Site SOPHIA -->
		
		
		
		//<!-- GRAPH uVM ALL SITE By Site MontSouris -->
	
	    var outputm = new Array();
	    $.getJSON('api.php?command=getListPfsMereUvmBySite&site=Montsouris', function(data) {
	        outputm = data;
			
			chart = new Highcharts.Chart({
	            chart: {
	                renderTo: 'graphUvmBySiteMontsouris',
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false
	            },
	            title: {
	                text: 'Pourcentage d\'uVM par PFS (Montsouris)'
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
	                name: 'Browser share',
	                data: outputm
	            }]
			});
		});
		// <!-- Fin GRAPH uVM ALL SITE By Site Montsouris -->
		
		
		
		
		//<!-- GRAPH de Poupulation d' uVM ALL SITE and Site Bagnolet, SOPHIA et MontSouris -->
		
	    var output_population = new Array();
	    $.getJSON('api.php?command=getPopulation', function(data) {
	        output_population = data;		
		    chart = new Highcharts.Chart({
            	chart: {
                renderTo: 'population',
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
                	x: 12,
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
                	name: 'All Sites',
                	color: 'rgba(223, 83, 83, .5)',
                	data: output_population['HT2']
            	}]
        	});
    	});
    	//<!-- Fin GRAPH de Poupulation d' uVM ALL SITE and Site Bagnolet, SOPHIA et MontSouris -->
		
	});
});