$(function() {

    $(document).ready(function() {
		
		var availableDates = new Array();
		$.getJSON('api.php?command=getListVM', function(data) {
			$( "#tags" ).autocomplete({
				source: data
			});
     	});


		$("#demo1").jstree({ 
			"json_data" : {
				"ajax" : {
					"url" : "jstree/_docs/_json_data.json", 
					//"data" : function (n) { 
					//	return { id : n.attr ? n.attr("id") : 0	};
					//}
				}
			},
			"plugins" : [ "themes", "json_data"]
		});

	});
});
