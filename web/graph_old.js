		//<!-- GRAPH uVM ALL SITE By Site SOPHIA -->
	
	    $.getJSON('api.php?command=getListPfsMereUvmBySite&site=HT2', function(data) {
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
	                name: 'uVM',
	                data: data
	            }]
			});
		});
		// <!-- Fin GRAPH uVM ALL SITE By Site SOPHIA -->
		
		
		
		//<!-- GRAPH uVM ALL SITE By Site MontSouris -->
	
	    $.getJSON('api.php?command=getListPfsMereUvmBySite&site=Montsouris', function(data) {
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
	                name: 'uVM',
	                data: data
	            }]
			});
		});
		// <!-- Fin GRAPH uVM ALL SITE By Site Montsouris -->
		
		
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
		

