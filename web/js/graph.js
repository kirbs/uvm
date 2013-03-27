$(function() {
    var chart;

    $(document).ready(function() {

		//<!-- GRAPH PIE CHART ALL SITE -->
	
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
		// <!-- Fin Graph -->
		
		
		//<!-- GRAPH PIE CHART BAGNOLET -->
	
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
		// <!-- Fin Graph -->
		
		
		
		//<!-- GRAPH PIE CHART SOPHIA -->
	
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
		// <!-- Fin Graph -->
		
		
		//<!-- GRAPH PIE CHART MontSouris -->
	
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
		// <!-- Fin Graph -->
		
	
	});
});