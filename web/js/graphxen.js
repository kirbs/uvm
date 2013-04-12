$(function() {
    var chart;

    $(document).ready(function() {


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